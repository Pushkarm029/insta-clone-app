package handlers

import (
	"context"
	"log"
	"strconv"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type User struct {
	Username string `firestore:"Username"`
}

type Post struct {
	Link     string   `firestore:"Link"`
	Like     int      `firestore:"Like"`
	Comments []string `firestore:"Comments"`
}

//commments need to be fixed -> []map[string]string

func ImagesLinkHandler(ctx context.Context, client *firestore.Client) ([][]string, error) {
	var profilePackets [][]string
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
		var UserDataPackets User
		if err := doc.DataTo(&UserDataPackets); err != nil {
			log.Printf("Error reading post data: %v\n", err)
			continue
		}
		// user.username to be added
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
			strLikes := strconv.Itoa(post.Like)
			eachProfilePacket := append([]string{post.Link, strLikes}, post.Comments...)
			profilePackets = append(profilePackets, eachProfilePacket)
		}
	}
	return profilePackets, nil
}
