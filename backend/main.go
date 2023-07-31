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
func getHomePosts(c *gin.Context) {
	userMail := c.Param("userID")
	currentFollowingPackets, err := handlers.CurrentUserHandlers(ctx, client, userMail)
	if err != nil {
		log.Printf("Error fetching following of current user: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch following of current user"})
		return
	}
	FollowingOfCurrentUsers := currentFollowingPackets.UserData.FollowingList
	currentHomePostPackets, err := handlers.HomePostsHandler(ctx, client, FollowingOfCurrentUsers)
	if err != nil {
		log.Printf("Error fetching home posts: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch home posts"})
		return
	}
	c.JSON(http.StatusOK, currentHomePostPackets)
}
func getUserProfile(c *gin.Context) {
	userMail := c.Param("userID")
	currentUserPackets, err := handlers.CurrentUserHandlers(ctx, client, userMail)
	if err != nil {
		log.Printf("Error fetching user profile: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user profile"})
		return
	}
	c.JSON(http.StatusOK, currentUserPackets)
}
func getUserSearched(c *gin.Context) {
	currentUserPackets, err := handlers.SearchUsersHandlers(ctx, client)
	if err != nil {
		log.Printf("Error searching user : %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search user"})
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
func updateLike(c *gin.Context) {
	userMail := c.Param("OverAcEmail")
	imageURL := c.Param("OverAcImages")
	err := handlers.LikeHandler(ctx, client, c, userMail, imageURL)
	if err != nil {
		log.Printf("Error in updating like: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update like"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Like Updated"})
}
func updateFollowersNFollowing(c *gin.Context) {
	TargetMail := c.Param("OverAcEmail")
	ShooterMail := c.Param("UserID")
	err := handlers.UpdatedFollowersNFollowingFunc(ctx, client, c, TargetMail, ShooterMail)
	if err != nil {
		log.Printf("Error in updating followers and following: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update followers and following"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Follower Updated"})
}
func postComment(c *gin.Context) {
	userMail := c.Param("OverAcEmail")
	imageURL := c.Param("OverAcImages")
	err := handlers.AddCommentHandler(ctx, client, c, userMail, imageURL)
	if err != nil {
		log.Printf("Error in posting comment: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to post comment"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Comment Posted"})
}
func getComment(c *gin.Context) {
	userMail := c.Param("OverAcEmail")
	imageURL := c.Param("urlModEncoder")
	currentCommentPackets, err := handlers.GettingComments(ctx, client, userMail, imageURL)
	if err != nil {
		log.Printf("Error fetching comment: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Comment"})
		return
	}
	c.JSON(http.StatusOK, currentCommentPackets)
}
func explorePosts(c *gin.Context) {
	explorePostPackets, err := handlers.ExplorePostsHandler(ctx, client)
	if err != nil {
		log.Printf("Error fetching posts for explore page: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts for explore page"})
		return
	}
	c.JSON(http.StatusOK, explorePostPackets)
}

// initializing API endpoints
func initRoutes(r *gin.Engine) {
	r.GET("/api/explore/posts", explorePosts)
	r.GET("/api/search/users", getUserSearched)
	r.POST("/api/upload/:userID", postUpload)
	r.POST("/api/like/:OverAcEmail/:OverAcImages", updateLike)
	r.POST("/api/comment/post/:OverAcEmail/:OverAcImages", postComment)
	r.POST("/api/follow/:OverAcEmail/:UserID", updateFollowersNFollowing)
	r.GET("/api/profile/user/:userID", getUserProfile)
	r.GET("/api/comment/get/:OverAcEmail/:urlModEncoder", getComment)
	r.GET("/api/home/:userID", getHomePosts)
}
