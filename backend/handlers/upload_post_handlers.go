package handlers

import (
	"context"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

// UploadPostData represents the data structure for the uploaded post.
type UploadPostData struct {
	DownloadURL string `json:"downloadURL"`
	Caption     string `json:"caption"`
}

// UploadPostToFirestore is the handler function to upload a post to Firestore.
func UploadPostToFirestore(ctx context.Context, client *firestore.Client, c *gin.Context, userMail string) error {
	// Parse the request body to get the post data
	var post UploadPostData
	if err := c.ShouldBindJSON(&post); err != nil {
		log.Printf("Error parsing request body: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return err
	}
	// Query the "users" collection to find the document with the matching email
	usersCollection := client.Collection("users")
	query := usersCollection.Where("email", "==", userMail).Limit(1)
	docSnapshots, err := query.Documents(ctx).GetAll()
	if err != nil {
		log.Printf("Error querying users collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return err
	}

	if len(docSnapshots) == 0 {
		// User document not found
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return err
	}

	// Assuming there is only one user with the given email (since we used Limit(1))
	userDoc := docSnapshots[0].Ref

	// Create a new post document in the "posts" collection under the user document
	postsCollection := userDoc.Collection("posts")
	newPostRef, _, err := postsCollection.Add(ctx, map[string]interface{}{
		"downloadURL": post.DownloadURL,
		"caption":     post.Caption,
		// Add other relevant fields as needed
	})
	if err != nil {
		log.Printf("Error creating post document: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return err
	}
	c.JSON(http.StatusOK, gin.H{"message": "Post created", "postId": newPostRef.ID})
	return nil
}
