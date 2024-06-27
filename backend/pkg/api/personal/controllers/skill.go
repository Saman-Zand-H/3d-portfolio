package controllers

import (
	"backend/pkg/internal/utils"

	"github.com/gin-gonic/gin"
)

func ListSkills(c *gin.Context) {
	skills, err := utils.GetAllSkills()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, skills)
}
