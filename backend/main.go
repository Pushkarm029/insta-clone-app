package main

import (
	"context"
	"insta-clone-app/handlers"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
)

var (
	ctx    context.Context
	client *firestore.Client
)

func main() {
	// Initialize Firebase Admin SDK and Firestore client
	credPath := "./firebaseconfig.json"
	ctx = context.Background()
	opt := option.WithCredentialsFile(credPath)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("Error initializing Firebase app: %v\n", err)
	}

	client, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v\n", err)
	}

	// Close the Firestore client when done.
	defer client.Close()

	// Create a new Gin router
	r := gin.Default()

	// Enable CORS for all routes
	r.Use(cors.Default())

	// Initialize routes from the handlers package
	initRoutes(r)

	// Run the server on port 8080
	r.Run(":8080")
}

func getUserProfile(c *gin.Context) {
	userMail := c.Param("userID") // Declare and initialize the userID variable
	// Fetch the user profile using the CurrentUserHandler from the handlers package
	userID, err := handlers.EmailToUsernameHandlers(ctx, client, userMail)
	if err != nil {
		log.Printf("Error fetching user profile: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch username"})
		return
	}
	currentUserPackets, err := handlers.CurrentUserHandlers(ctx, client, userID)
	if err != nil {
		log.Printf("Error fetching user profile: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user profile"})
		return
	}
	// Respond with the user profile in the JSON format
	c.JSON(http.StatusOK, currentUserPackets)
}

func getUserSearched(c *gin.Context) {
	currentUserPackets, err := handlers.SearchUsersHandlers(ctx, client)
	if err != nil {
		log.Printf("Error fetching user profile: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user profile"})
		return
	}
	// Respond with the user profile in the JSON format
	c.JSON(http.StatusOK, currentUserPackets)
}
func postUpload(c *gin.Context) {
	userMail := c.Param("userID")
	err := handlers.UploadPostToFirestore(ctx, client, c, userMail)
	if err != nil {
		log.Printf("Error creating post: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}
	// Respond with a success message
	c.JSON(http.StatusOK, gin.H{"message": "Post created"})
}
func initRoutes(r *gin.Engine) {
	// Initialize the routes for images
	r.GET("/api/images/links", func(c *gin.Context) {
		// Fetch the images links using ImagesLinkHandler from handlers package
		links, err := handlers.ImagesLinkHandler(ctx, client)
		if err != nil {
			log.Printf("Error fetching images links: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch images links"})
			return
		}
		// Respond with the links in the JSON format
		c.JSON(http.StatusOK, links)
	})
	r.GET("/api/explore/posts", func(c *gin.Context) {
		// Fetch the images links using ImagesLinkHandler from handlers package
		ExplorePosts, err := handlers.ExplorePostsHandler(ctx, client)
		if err != nil {
			log.Printf("Error fetching images links: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch images links"})
			return
		}
		// Respond with the links in the JSON format
		c.JSON(http.StatusOK, ExplorePosts)
	})
	r.GET("/api/search/users", getUserSearched)
	r.POST("/api/upload/:userID", postUpload)
	r.GET("/api/profile/user/:userID", getUserProfile)
}
