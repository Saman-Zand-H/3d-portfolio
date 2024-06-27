package config

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

type Config struct {
	MongoURI string `mapstructure:"mongo.uri"`
	MongoDB  string `mapstructure:"mongo.database"`
}

var AppConfig Config

func LoadConfig() {
	envFile, err := filepath.Abs("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
	if err := godotenv.Load(envFile); err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
	
	AppConfig = Config{
		MongoURI: os.Getenv("BACKEND_MONGO_URI"),
		MongoDB:  os.Getenv("BACKEND_MONGO_DB"),
	}
	
}
