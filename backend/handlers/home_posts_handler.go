package handlers

import (
	"context"
	"log"
	"strconv"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type HomePosts struct {
	Number      int                 `json:"key"`
	Username    string              `json:"username"`
	ProfileLink string              `json:"profilelink"`
	Email       string              `json:"email"`
	ImageLink   string              `json:"image_link"`
	Like        string              `json:"like"`
	Comments    []map[string]string `json:"comments"`
	Caption     string              `json:"caption"`
}

//This handlers uses structs already present in current_user_handlers.go

func HomePostsHandler(ctx context.Context, client *firestore.Client, followingList []string) ([]HomePosts, error) {
	var response []HomePosts
	var responsePacket HomePosts
	for _, userEmail := range followingList {
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
				userPacket := UserProfileData{
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
					responsePacket = HomePosts{
						Username:    userPacket.Username,
						ProfileLink: userPacket.ProfileImageLink,
						Email:       userPacket.Email,
						ImageLink:   post.ImageLink,
						Like:        strLikes,
						Comments:    post.Comments,
						Caption:     post.Caption,
					}
					response = append(response, responsePacket)
				}
				break
			}
		}
	}
	return response, nil
}
