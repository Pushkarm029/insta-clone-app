import React, { useState, useEffect } from "react";
import "./App.css";
import { TbSettings2 } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { OverlayTest as ShowOverlay } from "./../overlay/overlay.js";

function CountPosts({ post }) {
  let index = 0;
  if (post) {
    post.forEach((postIter) => {
      if (postIter.image_link) {
        index++;
      }
    });
  }
  return <div className="profilepostscount">{index}</div>;
}

export default function Profile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const propEmail = params.get('prop');
  const [hoverProfileIMG, setHoverProfileIMG] = useState(null);
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const userEmail = useSelector((state) => state.user.userEmail);
  const userID = propEmail ? propEmail : userEmail;
  console.log(userID)
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`/api/profile/user/${userID}`, {
      headers: {
        Accept: 'application/json',
      },
      signal,
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response Data:', data);
        setUserData(data.userData);
        setUserPosts(data.userPosts);
      })
      .catch(error => {
        console.error('Error fetching images links:', error);
        setUserData({});
        setUserPosts([]);
      });

    return () => {
      abortController.abort();
    };
  }, [userID]);
  const [followed, setFollowed] = useState(false);
  const postFollowerUpdateData = {
    targetfollowers: userData.followers,
    operation: "follow",
  };
  const postUnfollowUpdateData = {
    targetfollowers: userData.followers,
    operation: "unfollow",
  };

  const handleFollow = async () => {
    try {
      setFollowed((prevLiked) => !prevLiked);
      const postUpdateData = !followed ? postFollowerUpdateData : postUnfollowUpdateData;
      const response = await fetch(`/api/follow/${propEmail}/${userEmail}`, {
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
  const [ShowOverlayState, setShowOverlayState] = useState([
    false,
    "",
    "",
    "",
    "",
    "",
  ]);
  const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID, overlayEmail] =
    ShowOverlayState;

  const handleOverlayStateChange = () => {
    setShowOverlayState((prevState) => [!prevState[0], ...prevState.slice(1)]);
  };
  return (
    <div className="profile">
      <div className="profileHead">
        <div className="profileHeadImg">
          <img src={userData.profile_image_link} alt={userData.username} />
        </div>
        <div className="profileHeadInner">
          <div className="profileHeadInnerOne">
            <p className="usernameProfile">{userData.username}</p>
            {propEmail && propEmail !== userEmail ? (followed ?
              <p className="unfollowButtonProfile" onClick={handleFollow}>UnFollow</p>
              :
              <p className="followButtonProfile" onClick={handleFollow}>Follow</p>
            ) : (
              <p className="unfollowButtonProfile" variant="text">Edit Profile</p>
            )}
            <TbSettings2 color="white" size={20} />
          </div>
          <div className="profileHeadInnerTwo">
            <div className="profileHeadIITOne">
              <CountPosts post={userPosts} />
              <p>posts</p>
            </div>
            <div className="profileHeadIITTwo">
              <div className="profileFollowers">{userData.followersList ? userData.followersList.length : (0)}</div>
              <p>followers</p>
            </div>
            <div className="profileHeadIITThree">
              <div className="profileFollowing">{userData.followingList ? userData.followingList.length : (0)}</div>
              <p>following</p>
            </div>
          </div>
          <div className="profileHeadInnerThree">
            <p>{userData.name}</p>
          </div>
          <div className="profileHeadInnerFour">
            <p>{userData.bio}</p>
          </div>
          <div className="profileHeadLink">
            <a href={userData.link}>{userData.link}</a>
          </div>
        </div>
      </div>
      {/* <div className="savedStories"></div> */}
      <div className="ProfilePost">
        {showOverlay && (
          <ShowOverlay
            onStateChange={handleOverlayStateChange}
            OverAcID={overlayId}
            OverAcCaption={overlayCaption}
            OverAcLikes={overlayLikes}
            OverAcImages={overlayImageID}
            OverAcEmail={overlayEmail}
          />
        )}
        {userPosts ? (
          userPosts.map((profileAccountPosts, index) => (
            <div
              key={index}
              onClick={() =>
                setShowOverlayState([
                  true,
                  userData.username,
                  profileAccountPosts.caption,
                  profileAccountPosts.like,
                  profileAccountPosts.image_link,
                  userID,
                ])
              }
              onMouseEnter={() => setHoverProfileIMG(index)}
              onMouseLeave={() => setHoverProfileIMG(null)}
              className="profileImages"
            >
              {hoverProfileIMG === index && (
                <div className="hoverOverlay">
                  <div className="hoverOverlayContent">
                    <div className="hoverOverlayLike">
                      <AiFillHeart size={25} color="white" />
                      <p>{profileAccountPosts.like}</p>
                    </div>
                    <div className="hoverOverlayComment">
                      <TbMessageCircle2Filled size={25} color="white" />
                      {profileAccountPosts.comments && profileAccountPosts.comments.length > 0 ? (<p>{profileAccountPosts.comments.length}</p>) : (<p>0</p>)}
                    </div>
                  </div>
                </div>
              )}
              <img
                src={profileAccountPosts.image_link}
                alt={profileAccountPosts.caption}
              />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
