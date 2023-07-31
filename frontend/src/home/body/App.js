import "./App.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { accountList } from "./../../data/account";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMessageSquare, FiBookmark } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { useRef, useState } from "react";
import React from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { OverlayTest as ShowOverlay } from "./../../overlay/overlay.js";
import { useMediaQuery } from 'react-responsive'
import { useEffect } from "react";
import { useSelector } from "react-redux";

// function randomizeHomePosts(arr) {
//   const shuffledArray = [...arr];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// }

// function randomNumberToShowPosts(num) {
//   return Math.floor(Math.random() * num);
// }

function CheckUsername(text) {
  let length = text.length;
  if (length >= 11) {
    return text.slice(0, 8) + "...";
  } else {
    return text;
  }
}

function HomeBookmark({ bookmark, onClick }) {
  if (bookmark) {
    return <BsFillBookmarkFill onClick={onClick} size={22} color="white" style={{ paddingRight: '8px', paddingTop: '7px', paddingBottom: '7px' }} />
  }
  return <FiBookmark onClick={onClick} size={25} color="white" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
}

// storing all props as array in a state then passing it to the overlay component is a good idea for now

export default function Body() {
  const [liked, setLiked] = useState(false);
  const [dataHome, setDataHome] = useState([]);
  const userEmail = useSelector((state) => state.user.userEmail);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`/api/home/${userEmail}`, {
      headers: {
        Accept: 'application/json',
      },
      signal,
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response Data:', data);
        setDataHome(data);
      })
      .catch(error => {
        console.error('Error fetching images links:', error);
        setDataHome([]);
      });

    return () => {
      abortController.abort();
    };
  }, [userEmail]);
  const postLikeUpdateData = {
    likes: dataHome.image_link,
    operation: "like",
  }
  const postDisLikeUpdateData = {
    likes: dataHome.image_link,
    operation: "dislike",
  }
  //implement a system for unique like and for dataHome arrray index
  const modifiedUrl = dataHome.image_link.replace('https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/', '');
  const handleLike = async () => {
    try {
      // Toggle the liked state using the callback form of setLiked
      setLiked((prevLiked) => !prevLiked);

      // Use the updated liked state to determine postUpdateData
      const postUpdateData = liked ? postDisLikeUpdateData : postLikeUpdateData;

      const response = await fetch(`/api/like/${userEmail}/${encodeURIComponent(modifiedUrl)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postUpdateData),
      });

      if (response.ok) {
        console.log('Data posted successfully to the backend!');
      } else {
        // Handle error response from the backend
        console.error('Error posting data:', response.statusText);
      }
      // No need to setLiked(true) here, as it was already updated with the callback form
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  // const [randomizedAccountList, setRandomizedAccountList] = useState(randomizeHomePosts(accountList));
  // const [randomizedStoryList, setRandomizedStoryList] = useState(randomizeHomePosts(accountList));
  // const [randomizedNumber, setRandomizedNumber] = useState(randomNumberToShowPosts(3));
  const [ShowOverlayState, setShowOverlayState] = useState([false, "", "", "", "", ""]);
  const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID, overlayEmail] = ShowOverlayState;


  const handleOverlayStateChange = () => {
    setShowOverlayState(prevState => [!prevState[0], ...prevState.slice(1)]);
  };

  //bookmark is currently not stored in firestore database
  const [bookmark, setBookmark] = useState([]);
  const handleBookmark = (accountId, postNumber) => {
    const bookmarkId = `${accountId}+${postNumber}`;
    if (bookmark.includes(bookmarkId)) {
      setBookmark(prevBookmarkImages => prevBookmarkImages.filter(image => image !== bookmarkId));
    } else {
      setBookmark(prevBookmarkImages => [...prevBookmarkImages, bookmarkId]);
    }
  };
  return (
    // implement story is not completed yet
    <div className="body">

      {showOverlay && <ShowOverlay
        onStateChange={handleOverlayStateChange}
        OverAcID={overlayId}
        OverAcCaption={overlayCaption}
        OverAcLikes={overlayLikes}
        OverAcImages={overlayImageID}
        OverAcEmail={overlayEmail}
      />}

      <div className="stories">
        {accountList.slice(0, 8).map((account) => (
          <div key={account.id} className="storyinner">
            <img src={account.url} alt={account.id} />
            {/* <p>{CheckUsername(account.username)}</p> */}
            <p>{CheckUsername(account.id)}</p>
          </div>
        ))}
      </div>
      <div className="posts">
        {dataHome.length > 0 ? (
          dataHome.map((account, index) => (
            <div className="post" key={index}>
              <div className="individualpost" key={account.key}>
                <div className="postheader">
                  <div className="postheaderpartone">
                    {/* profile link to be fetched */}
                    <img src={account.profilelink} alt={account.username} />
                    <p className="postheadertopid">{account.username}</p>
                    <p className="postheadertopduration">· 1 d</p>
                  </div>
                  <FiMoreHorizontal color="white" size={20} />
                </div>
                <div key={index}>
                  {/* implement double click like here */}
                  <div
                    onDoubleClick={handleLike}
                    className="postimage"
                  >
                    <img src={account.image_link} alt="" />
                  </div>
                  <div className="interactablepost">
                    <div className="interactablepostleft">
                      {liked ? (
                        <AiFillHeart onClick={handleLike} size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                      ) : (
                        <AiOutlineHeart onClick={handleLike} size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                      )}
                      <FiMessageSquare
                        onClick={() =>
                          setShowOverlayState([
                            true,
                            account.username,
                            account.caption,
                            account.like,
                            account.image_link,
                            account.email,
                          ])
                        }
                        size={25}
                        color="white"
                        style={{
                          paddingLeft: "7px",
                          paddingRight: "7px",
                          paddingTop: "7px",
                          paddingBottom: "7px",
                        }}
                      />
                      <RiShareForwardLine
                        size={25}
                        color="white"
                        style={{
                          paddingLeft: "7px",
                          paddingTop: "7px",
                          paddingBottom: "7px",
                        }}
                      />
                    </div>
                    <div className="interactablepostright">
                      <HomeBookmark
                        onClick={() => handleBookmark(account.username, index)}
                        bookmark={bookmark.includes(`${account.username}+${index}`)}
                      />
                    </div>
                  </div>
                  <div className="postfooter">
                    {liked ?
                      (<p className="homeLikeMeter">{parseInt(account.like) + 1} Likes</p>)
                      :
                      (<p className="homeLikeMeter">{account.like} Likes</p>)
                    }
                    <p className="homeLikeMeter"></p>
                    <div className="postfootercaption">
                      <p className="postFooterAccountName">{account.username}</p>
                      <p className="postFooterAccountCaption">{account.caption}</p>
                    </div>
                    <p>1 comment</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No post available</p>
        )}
      </div>
    </div>
  );
}