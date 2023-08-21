package handlers

import (
	"context"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

type UpdatedFollowersNFollowing struct {
	TargetFollowers string `json:"targetfollowers"`
	Operation       string `json:"operation"`
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
	query2 := usersCollection.Where("email", "==", ShooterMail).Limit(1)
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
	//following adding in shooter's account
	shooterUserSnapshots, err := query2.Documents(ctx).GetAll()
	if err != nil {
		log.Printf("Error querying users collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return err
	}
	if len(shooterUserSnapshots) == 0 {
		// User document not found
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return err
	}
	shooterUserDoc := shooterUserSnapshots[0].Ref
	_, err = shooterUserDoc.Update(ctx, []firestore.Update{{Path: "followingList", Value: firestore.ArrayUnion(TargetMail)}})
	if err != nil {
		log.Printf("Error querying users collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return err
	}

	// done
	//followers adding in target's account
	targetUserSnapshots, err := query.Documents(ctx).GetAll()
	if err != nil {
		log.Printf("Error querying users collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return err
	}
	if len(targetUserSnapshots) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return err
	}
	targetUserDoc := targetUserSnapshots[0].Ref
	_, err = targetUserDoc.Update(ctx, []firestore.Update{{Path: "followersList", Value: firestore.ArrayUnion(ShooterMail)}})
	log.Printf("done")
	if err != nil {
		log.Printf("Error querying users collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return err
	}
	c.JSON(http.StatusOK, gin.H{"message": "Follower updated", "postId": userSnapshots[0].Ref.ID})
	return nil
	//done
}
