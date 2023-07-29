package handlers

import (
	"context"
	"log"
	"net/http"

	"strconv"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

type UpdatedFollowersNFollowing struct {
	TargetFollowers string `json:"targetfollowers"`
	// ShooterFollowing string `json:"shooterfollowing"`
	Operation string `json:"operation"`
}

func UpdatedFollowersNFollowingFunc(ctx context.Context, client *firestore.Client, c *gin.Context, TargetMail string, ShooterMail string) error {
	var user UpdatedFollowersNFollowing
	if err := c.ShouldBindJSON(&user); err != nil {
		log.Printf("Error parsing request body: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return err
	}
	usersCollection := client.Collection("users")
	query := usersCollection.Where("email", "==", TargetMail).Limit(1)
	userSnapshots, err := query.Documents(ctx).GetAll()
	if err != nil {
		log.Printf("Error querying users collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return err
	}
	if len(userSnapshots) == 0 {
		// User document not found
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return err
	}
	userDoc := userSnapshots[0].Ref

	followersCount, err := strconv.Atoi(user.TargetFollowers)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to convert into int"})
		return err
	}
	if user.Operation == "follow" {
		followersCount++
	}
	_, err = userDoc.Update(ctx, []firestore.Update{{Path: "followers", Value: followersCount}})
	if err != nil {
		log.Printf("Error updating post document: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return err
	}
	c.JSON(http.StatusOK, gin.H{"message": "Post updated", "postId": userSnapshots[0].Ref.ID})
	return nil
}
