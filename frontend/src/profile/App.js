import React, { useState, useEffect } from "react";
import { accountList } from '../data/account';
import './App.css';
// import Button from '@material-ui/core/Button';
import {TbSettings2} from "react-icons/tb";
import {AiFillHeart} from "react-icons/ai";
import {TbMessageCircle2Filled} from "react-icons/tb";

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

export default function Profile() {
  const [hoverProfileIMG, setHoverProfileIMG] = useState(null);
    return (
      <div className='profile'>
        <div className='profileHead'>
          <div className="profileHeadImg">
            <img src={accountList[0].url} alt={accountList[0].id}/>
          </div>
          <div className='profileHeadInner'>
            <div className='profileHeadInnerOne'>
              <p>{accountList[0].id}</p>
              <button variant='text'>Edit Profile</button>
              <TbSettings2 color="white" size={20}/>
            </div>
            <div className='profileHeadInnerTwo'>
              <div className='profileHeadIITOne'>
                <CountPosts index={0}/>
                <p>posts</p>
              </div>
              <div className='profileHeadIITTwo'>
                <div className="profileFollowers">{accountList[0].followers}</div>
                <p>followers</p>
              </div>
              <div className='profileHeadIITThree'>
                <div className="profileFollowing">{accountList[0].following}</div>
                <p>following</p>
              </div>
            </div>
            <div className="profileHeadInnerThree">
              <p>{accountList[0].name}</p>
            </div>
            <div className="profileHeadInnerFour">
              <p>{accountList[0].description}</p>
            </div>
            <div className="profileHeadLink">
              <a href={accountList[0].url}>{accountList.url}</a>
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
