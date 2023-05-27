import "./App.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { accountList } from "./../../data/account";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMessageSquare, FiBookmark } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { useState } from "react";
import React from "react";
import {BsFillBookmarkFill} from "react-icons/bs";

function randomizeHomePosts(arr) {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function randomNumberToShowPosts(num) {
  return Math.floor(Math.random() * num);
}

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

function HomeBookmark({ bookmark, onClick}) {
  if (bookmark) {
    return <BsFillBookmarkFill onClick={onClick} size={22} color="white" style={{  paddingRight: '8px', paddingTop: '7px', paddingBottom: '7px' }} />
  }
  return <FiBookmark onClick={onClick} size={25} color="white" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
}

function LikeMeter ({accountId, postNumber, likeCount, likedImages}){
  let likeCountinLikeMeter = likeCount;
  const imageId = `${accountId}+${postNumber}`;
  if (likedImages.includes(imageId)) {
    return <p className="homeLikeMeter">{++likeCountinLikeMeter} Likes</p>; 
  } else {
    return <p className="homeLikeMeter">{likeCountinLikeMeter} Likes</p>;
  }
};

export default function Body() {
  const [randomizedAccountList, setRandomizedAccountList] = useState(randomizeHomePosts(accountList.slice(1)));
  const [randomizedStoryList, setRandomizedStoryList] = useState(randomizeHomePosts(accountList.slice(1)));
  const [randomizedNumber, setRandomizedNumber] = useState(randomNumberToShowPosts(3));
  // later i want a add a algo so it finds a random value between posts.length(of a particular account(inside a map)) and 0
  const [likedImages, setLikedImages] = useState([]);
  const[bookmark, setBookmark] = useState([]);
  const handleDoubleClick = (accountId, postNumber) => {
    const likedImage = `${accountId}+${postNumber}`;
    setLikedImages(prevLikedImages => [...prevLikedImages, likedImage]);
  };
  const handleClick = (accountId, postNumber) => {
    const imageId = `${accountId}+${postNumber}`;
    if (likedImages.includes(imageId)) {
      setLikedImages(prevLikedImages => prevLikedImages.filter(image => image !== imageId)); 
    } else {
      setLikedImages(prevLikedImages => [...prevLikedImages, imageId]);
    }
  };
  const handleBookmark = (accountId, postNumber) => {
    const bookmarkId = `${accountId}+${postNumber}`;
    if (bookmark.includes(bookmarkId)) {
      setBookmark(prevBookmarkImages => prevBookmarkImages.filter(image => image !== bookmarkId)); 
    } else {
      setBookmark(prevBookmarkImages => [...prevBookmarkImages, bookmarkId]);
    }
  };
  return (
    <div className="body">
      <div className="stories">
        {randomizedStoryList.slice(0, 8).map((account) => (
          <div key={account.id} className="storyinner">
            <img src={account.url} alt={account.name} />
            <p>{CheckUsername(account.id)}</p>
          </div>
        ))}
      </div>
      <div className="posts">
        {randomizedAccountList.map((account, accountIndex) => (
          <div className="post" key={account.id}>
              {account.posts.length > 0 ? (
                <div className="individualpost" key={account.posts[randomizedNumber].number}>
                  <div className="postheader">
                    <div className="postheaderpartone">
                      <img src={account.url} alt={account.id} />
                      <p className="postheadertopid">{account.id}</p>
                      <p className="postheadertopduration">· 1 d</p>
                    </div>
                    <FiMoreHorizontal color="white" size={20} />
                  </div>
                  <div key={account.posts[randomizedNumber].number}>
                    <div
                      onDoubleClick={() => handleDoubleClick(account.id, account.posts[randomizedNumber].number)}
                      className="postimage"
                    >
                      <img src={account.posts[randomizedNumber].imageurl} 
                        alt="" 
                      />
                    </div>
                    <div className="interactablepost">
                      <div className="interactablepostleft">
                        <HomeLike onClick={() => handleClick(account.id, account.posts[randomizedNumber].number)} liked={likedImages.includes(`${account.id}+${account.posts[randomizedNumber].number}`)} />
                        <FiMessageSquare size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                        <RiShareForwardLine size={25} color="white" style={{ paddingLeft: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                      </div>
                      <div className="interactablepostright">
                        <HomeBookmark onClick={() => handleBookmark(account.id, account.posts[randomizedNumber].number)} bookmark={bookmark.includes(`${account.id}+${account.posts[randomizedNumber].number}`)}/>
                      </div>
                    </div>
                    <div className="postfooter">
                      <LikeMeter accountId={account.id} postNumber={account.posts[randomizedNumber].number} likeCount={account.posts[randomizedNumber].likes} likedImages={likedImages} />
                      <div className="postfootercaption">
                        <p className="postFooterAccountName">{account.name}</p>
                        <p className="postFooterAccountCaption">{account.posts[randomizedNumber].caption}</p>
                      </div>
                      <p>1 comment</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No post available</p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}