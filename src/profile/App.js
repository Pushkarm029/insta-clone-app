import React, { useState, useEffect } from "react";
import { accountList } from '../data/account';
import './App.css';
import Button from '@material-ui/core/Button';
import {TbSettings2} from "react-icons/tb";
import {AiFillHeart} from "react-icons/ai";
import {TbMessageCircle2Filled} from "react-icons/tb";

// function CountPosts() {
//   return <CountPostsFX data={accountList[0]} />;
// }

// function CountPostsFX(props) {
//   const [countPostNumber, setCountPostNumber] = useState(0);
//   const data = props.posts;

//   useEffect(() => {
//     if (data) {
//       data.forEach((item) => {
//         if (item) {
//           setCountPostNumber(countPostNumber + 1);
//         }
//       });
//     }
//   }, [data]);

//   return <div className="profilepostscount">{countPostNumber}</div>;
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
  const [hoverProfileIMG, setHoverProfileIMG] = useState(false);
    return (
      <div className='profile'>
        <div className='profileHead'>
          <div className="profileHeadImg">
            <img src={accountList[0].url} alt={accountList[0].id}/>
          </div>
          <div className='profileHeadInner'>
            <div className='profileHeadInnerOne'>
              <p>{accountList[0].id}</p>
              <Button variant='text'>Edit Profile</Button>
              <TbSettings2 color="white" size={20}/>
            </div>
            <div className='profileHeadInnerTwo'>
              <div className='profileHeadIITOne'>
                {/* <CountPosts/> */}
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
              {/*Later we can add link data in accountList*/}
            </div>
          </div>
        </div>
        <div className="savedStories"></div>
        {/*later can be added */}
        {/*a posts reels tagged can be added through route*/}
        <div className="ProfilePost">
        {accountList && accountList[0].posts.length > 0 ? (
          accountList[0].posts.map((profileAccountPosts) => (
            <div
              onMouseEnter={() => {setHoverProfileIMG(true)}}
              onMouseLeave={() => {setHoverProfileIMG(false)}}
              className='profileImages'
            >
              {hoverProfileIMG && (
                <div className="hoverOverlay">
                  <div className="hoverOverlayContent">
                    <div className="hoverOverlayLike">
                      <AiFillHeart size={25} color="white" />
                      <p>{profileAccountPosts.likes}</p>
                    </div>
                    <div className="hoverOverlayComment">
                      <TbMessageCircle2Filled size={25} color="white" />
                      <p>{profileAccountPosts.likes}</p>
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
        ) : (<p>No post available</p>)}
        </div>
      </div>
    );
}
