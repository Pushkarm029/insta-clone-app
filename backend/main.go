package main

import (
	"context"
	"fmt"
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

var firebaseConfig = `{
	"type": "service_account",
	"project_id": "insta-clone-app-77662",
	"private_key_id": "47457baf37eb424e0551768c5843f6b88f278b31",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYNQceejI2HZg0\nWKqmKXi2Mtb2EyYfAKitRxAAzF9bA01guLBs4bs36wVj0DOa9CDXXu1YezLj01b+\nOOtqxY1Ae68JsFaXqVJwxDuC1qzm+cidcbfkN+16xYb0dUBPc50cZZ322IUmq1VU\nJ1E2196xD0j5x2PqB5rvrydmV9XboV1yAmgQrKl6ZfXIaCM4U9WeiFM/R5b+oSCW\ntypjDujFM9xsgy0Dkcf8tFyErD+U5AarmT5ouRHGCGflfGR9ewhHr9NNQ+y0gBZn\nlL8rHbsNrGBBjPLyaR35oxbQZ41gzGYiJsiIK0gbtdHBTeTNkV8S0i1sACfgAhFC\nmPHzAfwfAgMBAAECggEAJ4aCN6slNMlyQteW0uuv+rcOn0ve4zoOnCbqoQq7v/q5\nkZ4R+sXFoTJg+N9eH8zTmCvtfgh/xDClrbIgL5PP/+LcnAvVuMImpSDqtD+kulEd\nwNLCSIGE87XatyQcTqoXJdLZ7v+kT+5wmgLaEQmj14Cw2aD+/hDH3VuK+2XBXfYr\nAZpcscQJ+JCBlgDw8c1BRVRIF5zZ51/n0ik+4Px8dywjxpL1xxveveitPLIB7my2\naIYQhUcsLFKla8ers/4F2Oi1BUrFrCisDVf4ls2HmaIMQdIRhEZTwbT8xeAXRmOd\no/atXTUswZjBJcecy/I9bAou/jGt9WkG0D1tresQGQKBgQDwk44L9lRTW0dt43b1\ntCSQWx2WdneWyCikpkbmwBVCUdyKMC2LpgXm0H3ts4mdmBYzIa7RwQk6AGfUSm4J\ncNF4MBEeFRusSq5yHE0LM0un3RhBtWEeY6p8fF4kxR/AyjUBHlSuD482FHrBslmH\nJj34q5owqCEeHHKBpVjLS6k9OwKBgQDmEYOhhagbDMEyIxEJj5cn+lRV7Na4b4Zp\nTj0sqXaIGFjGeqsMekACCkXK8bcJI5JX/R4L6yZK86fur09oihJ1K8zR2fQuOzsr\ncOg8ZvhVvrhyI4IEq0tlo6D8J1alaXddVOx2pss/+PfIchT7LolSp2oB16oLV9lm\nsMDuv/IebQKBgQDPwz6LSiKtEklvt1+G9hoVqPq2dHz29MlU2Fym7v/tFHFXzh+n\nWKwEF86JN+IC/dM+OTqW3xSuyKbiiZzZ/lqIZ0qBJk2Nz7kzxwkqQRR3VdOa+59x\n9TTI6UcMjkjL4FVCMAWFhN5zH+Cb4wC6XOZsGRbCKpDfRkYFfNxgRWlU/QKBgGbn\nVIntX0hiBxOmzZsKJ6DQ/eHE4jFyaJs3THNqhMLQqPx1p4YYNAL1l0vzm1uyFmXW\nqBbKocEKhIVk0k6+2wyff6gpJWd8RLXkdWt23wJzIMqkiSYPe9TFQF8oNUAdES+k\nqXNUnTpK4IE+TZYftXpLuUWDseIK9AlTa6geIGxtAoGBAIECx79cJiCejP+jgmQS\n176Kk5xfr9aGCLjXCngwsnqW8fgSaHV9LRt8+ZmeWP4YDeOwPQfcJp7zKV1iWD2j\nPmA9X5+/hOZDEfRBpGaPlhZbVn7k7AdyNVRpdzara+TV/BcccMXHkHuKHiyoJ0qz\nMbR1vpDF83G03IEArnueo40d\n-----END PRIVATE KEY-----\n",
	"client_email": "firebase-adminsdk-t7co2@insta-clone-app-77662.iam.gserviceaccount.com",
	"client_id": "111780667064937172033",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t7co2%40insta-clone-app-77662.iam.gserviceaccount.com",
	"universe_domain": "googleapis.com"
  }`

func main() {
	// Initialize Firebase Admin SDK and Firestore client
	fmt.Print("start")
	// credPath := "./firebaseconfig.json"
	fmt.Print("pathtaken")
	ctx = context.Background()
	opt := option.WithCredentialsJSON([]byte(firebaseConfig))
	// opt := option.WithCredentialsFile(credPath)
	fmt.Print("chalrha1")
	fmt.Print(opt)
	fmt.Print("checksdsds")
	app, err := firebase.NewApp(ctx, nil, opt)
	fmt.Print("chalrha2")
	if err != nil {
		log.Fatalf("Error initializing Firebase app: %v\n", err)
	}
	fmt.Print("chalrha3")
	client, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v\n", err)
	}
	fmt.Print("chalrha4")
	// Close the Firestore client when done.
	defer client.Close()

	// Create a new Gin router
	r := gin.Default()

	// Enable CORS for all routes
	r.Use(cors.Default())
	fmt.Print("chalrha5")
	// Initialize routes from the handlers package
	initRoutes(r)
	fmt.Print("chalrha6")
	// Run the server on port 8080
	r.Run(":8080")
	fmt.Print("chalrha7")
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
