package personal

import (
	"github.com/gin-gonic/gin"

	"backend/pkg/api/personal/controllers"
)

func RegisterRoutes(router *gin.Engine) {
	router.GET("/skills", controllers.ListSkills)
}
