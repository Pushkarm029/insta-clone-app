package handlers

import (
	"context"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

type postComment struct {
	Comment     string `json:"Comment"`
	CurrentUser string `json:"Currentuser"`
}

func AddCommentHandler(ctx context.Context, client *firestore.Client, c *gin.Context, userMail string, imageURL string) error {
	var post postComment
	comURL := "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/" + imageURL
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
		// User document not found
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return err
	}

	// Assuming there is only one user with the given email (since we used Limit(1))
	userDoc := docSnapshots[0].Ref

	// Find the post with the matching imageURL under the user document
	postsCollection := userDoc.Collection("posts")
	q2 := postsCollection.Where("downloadURL", "==", comURL).Limit(1)
	postSnapshots, err := q2.Documents(ctx).GetAll()
	if err != nil {
		log.Printf("Error querying posts collection: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get post data"})
		return err
	}

	if len(postSnapshots) == 0 {
		// Post document not found
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return err
	}
	postDoc := postSnapshots[0].Ref

	// Update the comments array in the post document
	commentData := map[string]interface{}{
		"comment":     post.Comment,
		"currentUser": post.CurrentUser,
		"timestamp":   firestore.ServerTimestamp, // You can add a timestamp if needed
	}

	_, err = postDoc.Update(ctx, []firestore.Update{
		{Path: "comments", Value: firestore.ArrayUnion(commentData)},
	})
	if err != nil {
		log.Printf("Error updating post document: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return err
	}

	c.JSON(http.StatusOK, gin.H{"message": "Comment added", "postId": postSnapshots[0].Ref.ID})
	return nil
}
