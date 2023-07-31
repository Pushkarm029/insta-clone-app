package handlers

import (
	"context"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

type UploadPostData struct {
	DownloadURL string `json:"downloadURL"`
	Caption     string `json:"caption"`
}

func UploadPostToFirestore(ctx context.Context, client *firestore.Client, c *gin.Context, userMail string) error {
	var post UploadPostData
	if err := c.ShouldBindJSON(&post); err != nil {
		log.Printf("Error parsing request body: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return err
	}
	usersCollection := client.Collection("users")
	query := usersCollection.Where("email", "==", userMail).Limit(1)
	docSnapshots, err := query.Documents(ctx).GetAll()
	if err != nil {
		log.Printf("Error querying users collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return err
	}

	if len(docSnapshots) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return err
	}

	userDoc := docSnapshots[0].Ref

	postsCollection := userDoc.Collection("posts")
	newPostRef, _, err := postsCollection.Add(ctx, map[string]interface{}{
		"downloadURL": post.DownloadURL,
		"caption":     post.Caption,
	})
	if err != nil {
		log.Printf("Error creating post document: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return err
	}
	c.JSON(http.StatusOK, gin.H{"message": "Post created", "postId": newPostRef.ID})
	return nil
}
