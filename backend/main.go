package main

import (
	"context"
	handlers "insta-clone-app/handlers"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

func main() {
	// Initialize Firebase Admin SDK and Firestore client
	// Set the path to your Firebase Admin SDK credentials JSON file.
	credPath := "./firebaseconfig.json"

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

	r.Use(cors.Default())

	// Initialize routes from the handlers package
	initRoutes(r, ctx, client)

	// Run the server on port 8080
	r.Run(":8080")
}

func initRoutes(r *gin.Engine, ctx context.Context, client *firestore.Client) {
	// Initialize the routes for comments
	// r.GET("/api/posts/:postId/comments", handlers.FetchCommentsHandler)
	// r.POST("/api/posts/:postId/comments", handlers.AddCommentHandler)

	// // Initialize the routes for likes
	// r.GET("/api/posts/:postId/likes", handlers.FetchLikesHandler)
	// r.POST("/api/posts/:postId/likes", handlers.AddLikeHandler)
	r.GET("/api/images/links", func(c *gin.Context) {
		// Fetch the images links using imagesLinkHandler from handlers package
		links, err := handlers.ImagesLinkHandler(ctx, client)
		if err != nil {
			log.Printf("Error fetching images links: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch images links"})
			return
		}
		// Respond with the links in the JSON format
		c.JSON(http.StatusOK, links)
	})
}
