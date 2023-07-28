import React, { useState, useEffect } from "react";
import "./App.css";
import { TbSettings2 } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';


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
  }, [userEmail]);
  return (
    <div className="profile">
      <div className="profileHead">
        <div className="profileHeadImg">
          <img src={userData.profile_image_link} alt={userData.username} />
        </div>
        <div className="profileHeadInner">
          <div className="profileHeadInnerOne">
            <p>{userData.username}</p>
            <button variant="text">Edit Profile</button>
            <TbSettings2 color="white" size={20} />
          </div>
          <div className="profileHeadInnerTwo">
            <div className="profileHeadIITOne">
              <CountPosts post={userPosts} />
              <p>posts</p>
            </div>
            <div className="profileHeadIITTwo">
              <div className="profileFollowers">{userData.followers}</div>
              <p>followers</p>
            </div>
            <div className="profileHeadIITThree">
              <div className="profileFollowing">{userData.following}</div>
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
      <div className="savedStories"></div>
      {/*later can be added */}
      {/*a posts reels tagged can be added through route*/}
      <div className="ProfilePost">
        {userPosts ? (
          userPosts.map((profileAccountPosts, index) => (
            <div
              key={index}
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
