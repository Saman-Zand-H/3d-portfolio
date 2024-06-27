package config

import (
	"log"

	"path/filepath"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

type Config struct {
	MongoURI string
	MongoDB  string
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

	configFile, err := filepath.Abs("pkg/config/config.yml")
	if err != nil {
		log.Fatalf("Error loading config file")
	}
	viper.SetConfigFile(configFile)
	viper.SetConfigType("yaml")
	viper.AutomaticEnv()

	viper.SetEnvPrefix("backend")
	viper.BindEnv("mongo.uri", "MONGO_URI")
	viper.BindEnv("mongo.database", "MONGO_DB")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %s", err)
	}

	if err := viper.Unmarshal(&AppConfig); err != nil {
		log.Fatalf("Unable to decode config into struct: %s", err)
	}

}
