import "./App.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { accountList } from "./../../data/account";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMessageSquare, FiBookmark } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { useState } from "react";

let nextId = 0;
function CheckUsername(text) {
  let length = text.length;
  if (length >= 11) {
    return text.slice(0, 8) + "...";
  } else {
    return text;
  }
}

function HomeLike({ liked, onClick}) {
  if (liked) {
    return <AiFillHeart onClick={onClick} size={25} color="#FF3040" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
  }
  return <AiOutlineHeart onClick={onClick} size={25} color="white" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
}

export default function Body() {
  const [commentText, setCommentText] = useState();
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([[]]);
  const [likedImages, setLikedImages] = useState([]);
  const handleDoubleClick = (accountId, postNumber) => {
    const likedImage = `${accountId}+${postNumber}`;
    setLikedImages(prevLikedImages => [...prevLikedImages, likedImage]);
    // const imageElement = document.getElementById(likedImage);
    // if (imageElement) {
    //   imageElement.classList.add("like-animation");
    //   setTimeout(() => {
    //     imageElement.classList.remove("like-animation");
    //   }, 500);
    // }
  };
  const handleClick = (accountId, postNumber) => {
    const imageId = `${accountId}+${postNumber}`;
    if (likedImages.includes(imageId)) {
      setLikedImages(prevLikedImages => prevLikedImages.filter(image => image !== imageId)); 
    } else {
      setLikedImages(prevLikedImages => [...prevLikedImages, imageId]);
    }
  };
  return (
    <div className="body">
      <div className="stories">
        {accountList.slice(1, 9).map((account) => (
          <div key={account.id} className="storyinner">
            <img src={account.url} alt={account.name} />
            <p>{CheckUsername(account.id)}</p>
          </div>
        ))}
      </div>
      <div className="posts">
        {accountList.slice(1).map((account, accountIndex) => (
          <div className="post" key={account.id}>
            <div className="postheader">
              <div className="postheaderpartone">
                <img src={account.url} alt={account.id} />
                <p>{account.id}</p>
                <p>1 Day Ago</p>
              </div>
              <FiMoreHorizontal color="white" size={20} />
            </div>
            <div>
              {account.posts.length > 0 ? (
                account.posts.map((post, postIndex) => (
                  <div key={post.number}>
                    <div
                      onDoubleClick={() => handleDoubleClick(account.id, post.number)}
                      className="postimage"
                    >
                      <img src={post.imageurl} 
                        alt="" 
                      />
                    </div>
                    <div className="interactablepost">
                      <div className="interactablepostleft">
                        <HomeLike onClick={() => handleClick(account.id, post.number)} liked={likedImages.includes(`${account.id}+${post.number}`)} />
                        <FiMessageSquare size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                        <RiShareForwardLine size={25} color="white" style={{ paddingLeft: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                      </div>
                      <div className="interactablepostright">
                        <FiBookmark size={25} color="white" style={{ paddingTop: '7px', paddingBottom: '7px' }} />
                      </div>
                    </div>
                    <div className="postfooter">
                      <p>{post.likes} likes</p>
                      <div className="postfootercaption">
                        <p>{account.name}</p>
                        <p>{post.caption}</p>
                      </div>
                      <p>1 comment</p>
                      {/* <input
                        key={postIndex}
                        value={comments[postIndex] || ''} // Add a fallback value to prevent undefined error
                        placeholder="Add a comment..."
                        onChange={e => {setCommentText(e.target.value)}}
                      />
                      <button onClick={() => {
                        const newComment = { id: nextId++, name: commentText[postIndex] };
                        const updatedComments = [...comments];
                        const accountComments = updatedComments[accountIndex] || []; // Add a fallback array if undefined
                        accountComments[postIndex] = newComment;
                        updatedComments[accountIndex] = accountComments;
                        setComments(updatedComments);
                        setCommentText([]);
                      }}>Add</button>
                      {comments[accountIndex]?.map((comment, commentIndex) => (
                        <p key={commentIndex}>{comment.name}</p>
                      ))} */}
                    </div>
                  </div>
                ))
              ) : (
                <p>No post available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
