package handlers

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type getCommentFromPost struct {
	Comments []map[string]string `json:"comment" firestore:"comments"`
	URL      string              `json:"ImageURL" firestore:"downloadURL"`
}

func GettingComments(ctx context.Context, client *firestore.Client, userMail string, imageURL string) ([]map[string]string, error) {
	var result []map[string]string
	comURL := "https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/" + imageURL
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
		if currentUserDataPackets.Email == userMail {
			log.Printf("email leliya")
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
				var currentPostDataPackets getCommentFromPost
				if err := postDoc.DataTo(&currentPostDataPackets); err != nil {
					log.Printf("Error reading post data: %v\n", err)
					continue
				}
				if currentPostDataPackets.URL == comURL {
					log.Printf("data bhi leliya")
					result = currentPostDataPackets.Comments
				}
			}
		}
	}
	return result, nil
}
