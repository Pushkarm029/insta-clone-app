package handlers

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type UserHelperToFindUsername struct {
	Username string `firestore:"username"`
	Email    string `firestore:"email"`
}

func EmailToUsernameHandlers(ctx context.Context, client *firestore.Client, email string) (string, error) {
	var username string
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
		var user UserHelperToFindUsername
		if err := doc.DataTo(&user); err != nil {
			log.Printf("Error reading post data: %v\n", err)
			continue
		}
		if user.Email == email {
			username = user.Username
		}
	}
	return username, nil

}
