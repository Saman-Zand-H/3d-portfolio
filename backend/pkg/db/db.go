package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/gridfs"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var GridFS *gridfs.Bucket

func ConnectMongoDB(uri, database string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(uri)

	var err error
	Client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %s", err)
	}

	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Error pinging MongoDB: %s", err)
	}

	GridFS, err = gridfs.NewBucket(
		Client.Database(database),
	)
	if err != nil {
		log.Fatalf("Error initializing GridFS bucket: %s", err)
	}

	log.Println("Connected to MongoDB!")
}
