package handlers

import (
	"context"
	"log"
	"strconv"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type CurrentUser struct {
	Username         string `firestore:"username"`
	Name             string `firestore:"name"`
	Followers        int    `firestore:"followers"`
	Following        int    `firestore:"following"`
	BIO              string `firestore:"BIO"`
	Link             string `firestore:"link"`
	ProfileImageLink string `firestore:"profile_image_link"`
	Email            string `firestore:"email"`
}

type CurrentUserPosts struct {
	ImageLink string   `firestore:"imageLink"`
	Like      int      `firestore:"like"`
	Comments  []string `firestore:"comments"`
}

type UserProfileData struct {
	Username         string `json:"username"`
	Name             string `json:"name"`
	Followers        string `json:"followers"`
	Following        string `json:"following"`
	BIO              string `json:"bio"`
	Link             string `json:"link"`
	ProfileImageLink string `json:"profile_image_link"`
	Email            string `json:"email"`
}

type NamedUserPosts struct {
	ImageLink string   `json:"image_link"`
	Like      string   `json:"like"`
	Comments  []string `json:"comments"`
}

type UserProfileResponse struct {
	UserData  UserProfileData  `json:"userData"`
	UserPosts []NamedUserPosts `json:"userPosts"`
}

func CurrentUserHandlers(ctx context.Context, client *firestore.Client, userID string) (*UserProfileResponse, error) {
	var currentUserPackets []string
	var currentUserPostPackets []NamedUserPosts
	usersCollection := client.Collection("users")
	iter := usersCollection.Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Printf("Error iterating over users collection: %v\n", err)
			break
		}
		var currentUserDataPackets CurrentUser
		if err := doc.DataTo(&currentUserDataPackets); err != nil {
			log.Printf("Error reading post data: %v\n", err)
			continue
		}
		if currentUserDataPackets.Username == userID {
			strFollowers := strconv.Itoa(currentUserDataPackets.Followers)
			strFollowing := strconv.Itoa(currentUserDataPackets.Following)
			currentUserPackets = append(currentUserPackets, currentUserDataPackets.Username)
			currentUserPackets = append(currentUserPackets, currentUserDataPackets.Name)
			currentUserPackets = append(currentUserPackets, strFollowers)
			currentUserPackets = append(currentUserPackets, strFollowing)
			currentUserPackets = append(currentUserPackets, currentUserDataPackets.BIO)
			currentUserPackets = append(currentUserPackets, currentUserDataPackets.Link)
			currentUserPackets = append(currentUserPackets, currentUserDataPackets.ProfileImageLink)
			postsCollection := doc.Ref.Collection("posts")
			postsIter := postsCollection.Documents(ctx)
			for {
				postDoc, err := postsIter.Next()
				if err == iterator.Done {
					break
				}
				if err != nil {
					log.Printf("Error iterating over posts collection: %v\n", err)
					break
				}
				var post CurrentUserPosts
				if err := postDoc.DataTo(&post); err != nil {
					log.Printf("Error reading post data: %v\n", err)
					continue
				}
				strLikes := strconv.Itoa(post.Like)
				eachProfilePacket := NamedUserPosts{
					ImageLink: post.ImageLink,
					Like:      strLikes,
					Comments:  post.Comments,
				}
				currentUserPostPackets = append(currentUserPostPackets, eachProfilePacket)
			}
			break
		}
	}
	response := &UserProfileResponse{
		UserData: UserProfileData{
			Username:         currentUserPackets[0],
			Name:             currentUserPackets[1],
			Followers:        currentUserPackets[2],
			Following:        currentUserPackets[3],
			BIO:              currentUserPackets[4],
			Link:             currentUserPackets[5],
			ProfileImageLink: currentUserPackets[6],
		},
		UserPosts: currentUserPostPackets,
	}
	return response, nil
}
