package handlers

import (
	"context"
	"log"
	"strconv"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

func ExplorePostsHandler(ctx context.Context, client *firestore.Client) ([]*UserProfileResponse, error) {
	usersCollection := client.Collection("users")
	iter := usersCollection.Documents(ctx)
	var responses []*UserProfileResponse
	for {
		var currentUserPostPackets []NamedUserPosts
		var response *UserProfileResponse
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
		response = &UserProfileResponse{
			UserData: UserProfileData{
				Username: currentUserDataPackets.Username,
				Email:    currentUserDataPackets.Email,
			},
			UserPosts: currentUserPostPackets,
		}
		responses = append(responses, response)
	}
	return responses, nil
}
