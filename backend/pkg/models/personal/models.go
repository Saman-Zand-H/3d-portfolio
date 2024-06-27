package personal

import "go.mongodb.org/mongo-driver/bson/primitive"

type Skill struct {
	ID    primitive.ObjectID `bson:"_id,omitempty"`
	Name  string             `bson:"name"`
	Image GridFSFile         `bson:"image"`
}

type GridFSFile struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Filename    string             `bson:"filename"`
	ContentType string             `bson:"contentType"`
}
