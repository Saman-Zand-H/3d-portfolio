package controllers

import (
	"backend/pkg/internal/utils"
	"backend/pkg/models/personal"
	"strconv"

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

func CreateSkills(c *gin.Context) {
	const imageFileKey string = "image"
	var skill personal.Skill

	if err := c.ShouldBindJSON(&skill); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	image, err := c.FormFile(imageFileKey)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	imageFile, err := image.Open()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	defer imageFile.Close()

	imageFileName := image.Filename
	if err := utils.SaveSkill(&skill, imageFile, imageFileName, image.Header.Get("Content-Type")); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(201, skill)
}

func UpdateSkills(c *gin.Context) {
	const imageFileKey string = "image"

	skillId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	skill, _, err := utils.GetSkillByID(skillId)

	if err := c.ShouldBindJSON(&skill); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	image, err := c.FormFile(imageFileKey)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	imageFile, err := image.Open()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	defer imageFile.Close()

	imageFileName := image.Filename
	if err := utils.SaveSkill(&skill, imageFile, imageFileName, image.Header.Get("Content-Type")); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, skill)
}
