package utils

import (
	"backend/pkg/config"
	"backend/pkg/db"
	"backend/pkg/models/personal"
	"context"
	"io"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func SaveSkill(skill *personal.Skill, image io.Reader, filename, contentType string) error {
	const collectionName = "skill"

	uploadStream, err := db.GridFS.OpenUploadStream(
		filename,
	)
	if err != nil {
		return err
	}
	defer uploadStream.Close()

	_, err = io.Copy(uploadStream, image)
	if err != nil {
		return err
	}

	skill.Image.ID = uploadStream.FileID.(primitive.ObjectID)
	skill.Image.Filename = filename
	skill.Image.ContentType = contentType

	collection := db.Client.Database(config.AppConfig.MongoDB).Collection(collectionName)
	_, err = collection.InsertOne(context.TODO(), skill)
	if err != nil {
		return err
	}

	return nil
}

func GetSkillByID(id primitive.ObjectID) (*personal.Skill, []byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var skill personal.Skill

	collection := db.Client.Database(config.AppConfig.MongoDB).Collection("skills")
	err := collection.FindOne(ctx, bson.M{"_id": id}).Decode(&skill)
	if err != nil {
		return nil, nil, err
	}

	downloadStream, err := db.GridFS.OpenDownloadStream(skill.Image.ID)
	if err != nil {
		return nil, nil, err
	}
	defer downloadStream.Close()

	imageBytes := make([]byte, downloadStream.GetFile().Length)
	_, err = downloadStream.Read(imageBytes)
	if err != nil && err != io.EOF {
		return nil, nil, err
	}

	return &skill, imageBytes, nil
}

func GetAllSkills() ([]personal.Skill, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var skills []personal.Skill

	collection := db.Client.Database(config.AppConfig.MongoDB).Collection("skills")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	err = cursor.All(ctx, &skills)
	if err != nil {
		return nil, err
	}

	return skills, nil
}
