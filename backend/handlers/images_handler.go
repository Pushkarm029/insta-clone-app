package handlers

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type Post struct {
	Link string `firestore:"links"`
}

func ImagesLinkHandler(ctx context.Context, client *firestore.Client) ([]string, error) {
	var links []string
	usersCollection := client.Collection("users")

	// Query all documents within the "users" collection
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

			var post Post
			if err := postDoc.DataTo(&post); err != nil {
				log.Printf("Error reading post data: %v\n", err)
				continue
			}

			links = append(links, post.Link)
		}
	}
	return links, nil
}
