package handlers

import (
	"context"
	"log"
	"strconv"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type SearchingUser struct {
	Username  string `firestore:"username"`
	Followers int    `firestore:"Followers"`
	Name      string `firestore:"Name"`
}

func SearchUsersHandlers(ctx context.Context, client *firestore.Client) ([][]string, error) {
	var SearchedPackets [][]string
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
		var UserDataPackets SearchingUser
		if err := doc.DataTo(&UserDataPackets); err != nil {
			log.Printf("Error reading post data: %v\n", err)
			continue
		}
		strFollowers := strconv.Itoa(UserDataPackets.Followers)
		eachSearchedPacket := []string{UserDataPackets.Username, strFollowers, UserDataPackets.Name}
		SearchedPackets = append(SearchedPackets, eachSearchedPacket)
	}
	return SearchedPackets, nil
}
