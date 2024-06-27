package main

import (
	"backend/pkg/api/personal"
	"backend/pkg/config"
	"backend/pkg/db"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()

	db.ConnectMongoDB(config.AppConfig.MongoURI, config.AppConfig.MongoDB)

	router := gin.Default()
	personal.RegisterRoutes(router)
	router.Run()
}
