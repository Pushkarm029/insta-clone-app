package handlers

import (
	"context"
	"log"
	"strconv"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type CurrentUser struct {
	Username         string   `firestore:"username"`
	Name             string   `firestore:"name"`
	FollowersList    []string `firestore:"followersList"`
	FollowingList    []string `firestore:"followingList"`
	BIO              string   `firestore:"BIO"`
	Link             string   `firestore:"link"`
	ProfileImageLink string   `firestore:"profile_image_link"`
	Email            string   `firestore:"email"`
}

type CurrentUserPosts struct {
	ImageLink string              `firestore:"downloadURL"`
	Like      int                 `firestore:"like"`
	Comments  []map[string]string `firestore:"comments"`
	Caption   string              `firestore:"caption"`
}

type UserProfileData struct {
	Username         string   `json:"username"`
	Name             string   `json:"name"`
	FollowersList    []string `json:"followersList"`
	FollowingList    []string `json:"followingList"`
	BIO              string   `json:"bio"`
	Link             string   `json:"link"`
	ProfileImageLink string   `json:"profile_image_link"`
	Email            string   `json:"email"`
}

type NamedUserPosts struct {
	ImageLink string              `json:"image_link"`
	Like      string              `json:"like"`
	Comments  []map[string]string `json:"comments"`
	Caption   string              `json:"caption"`
}

type UserProfileResponse struct {
	UserData  UserProfileData  `json:"userData"`
	UserPosts []NamedUserPosts `json:"userPosts"`
}

func CurrentUserHandlers(ctx context.Context, client *firestore.Client, userEmail string) (*UserProfileResponse, error) {
	var userPacket UserProfileData
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
		if currentUserDataPackets.Email == userEmail {
			userPacket = UserProfileData{
				Username:         currentUserDataPackets.Username,
				Name:             currentUserDataPackets.Name,
				FollowersList:    currentUserDataPackets.FollowersList,
				FollowingList:    currentUserDataPackets.FollowingList,
				BIO:              currentUserDataPackets.BIO,
				Link:             currentUserDataPackets.Link,
				ProfileImageLink: currentUserDataPackets.ProfileImageLink,
				Email:            currentUserDataPackets.Email,
			}

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
					Caption:   post.Caption,
				}
				currentUserPostPackets = append(currentUserPostPackets, eachProfilePacket)
			}
			break
		}
	}
	response := &UserProfileResponse{
		UserData:  userPacket,
		UserPosts: currentUserPostPackets,
	}
	return response, nil
}
