// main.go

package main

import (
	"context"
	"log"

	"github.com/pushkarm029/insta-clone-app/backend/handlers"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

func main() {
	// Initialize Firebase Admin SDK and Firestore client
	// Set the path to your Firebase Admin SDK credentials JSON file.
	credPath := "/firebaseconfig.json"

	// Create a new context.
	ctx := context.Background()

	// Initialize the Firebase Admin SDK with the credentials.
	opt := option.WithCredentialsFile(credPath)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("Error initializing Firebase app: %v\n", err)
	}

	// Initialize Firestore client.
	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v\n", err)
	}

	// Close the Firestore client when done.
	defer client.Close()

	// Create a new Gin router
	r := gin.Default()

	// Initialize routes from the handlers package
	initRoutes(r)

	// Run the server on port 8080
	r.Run(":8080")
}

func initRoutes(r *gin.Engine) {
	// Initialize the routes for comments
	r.GET("/api/posts/:postId/comments", handlers.FetchCommentsHandler)
	r.POST("/api/posts/:postId/comments", handlers.AddCommentHandler)

	// Initialize the routes for likes
	r.GET("/api/posts/:postId/likes", handlers.FetchLikesHandler)
	r.POST("/api/posts/:postId/likes", handlers.AddLikeHandler)
}
