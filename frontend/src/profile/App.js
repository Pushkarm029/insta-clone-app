import React, { useState, useEffect } from "react";
import { accountList } from "../data/account";
import "./App.css";
// import Button from '@material-ui/core/Button';
import { TbSettings2 } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2Filled } from "react-icons/tb";

function CountPosts({ index }) {
  const countPostNumber = accountList[index].posts.reduce(
    (count, profileAccountPostsCount) => {
      if (profileAccountPostsCount) {
        return count + 1;
      }
      return count;
    },
    0
  );
  return <div className="profilepostscount">{countPostNumber}</div>;
}

// function CountComments({ profileIndex, commentIndex }) {
//   const countCommentNumber = accountList[profileIndex].posts[commentIndex].comment.reduce(
//     (count, profileAccountCommentsCount) => {
//       if (profileAccountCommentsCount) {
//         return count + 1;
//       }
//       return count;
//     },
//     0
//   );
//   return <p className="profilecommentscount">{countCommentNumber}</p>;
// }

// function CountComments() {
//   return <CountCommentsFX data={accountList} />;
// }

// function CountCommentsFX(props) {
//   const [countCommentNumber, setCountCommentNumber] = useState(0);
//   const data = props.data;

//   useEffect(() => {
//     if (data) {
//       data.forEach((item) => {
//         if (item.url) {
//           setCountCommentNumber(countCommentNumber + 1);
//         }
//       });
//     }
//   }, [data]);

//   return <div className="profilepostscount">{countCommentNumber}</div>;
// }
 //will use redux to get userID

export default function Profile() {
  const [hoverProfileIMG, setHoverProfileIMG] = useState(null);
  // const [links, setLinks] = useState([]);
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const userID = "pushkarmishra029";
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`/api/profile/user/${userID}`, {
      headers: {
        Accept: 'application/json',
      },
      signal, // Pass the signal to the fetch request
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response Data:', data);
        setUserData(data.userData);
        setUserPosts(data.userPosts);
      })
      .catch(error => {
        console.error('Error fetching images links:', error);
        setUserData([]);
        setUserPosts([]);
      });
    return () => {
      abortController.abort(); // Cancel the fetch request when the component unmounts
    };
  }, []);
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
              <CountPosts index={0} />
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
        {accountList && accountList[0].posts.length > 0 ? (
          accountList[0].posts.map((profileAccountPosts, index) => (
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
                      <p>{profileAccountPosts.likes}</p>
                      {/* <CountComments profileIndex={0} commentIndex={index}/> */}
                    </div>
                    <div className="hoverOverlayComment">
                      <TbMessageCircle2Filled size={25} color="white" />
                      <p>{profileAccountPosts.number}</p>
                    </div>
                  </div>
                </div>
              )}
              <img
                src={profileAccountPosts.imageurl}
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
