import React, { useState, useEffect } from "react";
import { accountList } from '../data/account';
import './App.css';
import Button from '@material-ui/core/Button';
import {TbSettings2} from "react-icons/tb";

function CountPosts() {
  return <CountPostsFX data={accountList} />;
}

function CountPostsFX(props) {
  const [count, setCount] = useState(0);
  const data = props.data;

  useEffect(() => {
    if (data) {
      data.forEach((item) => {
        if (item.url) {
          setCount(count + 1);
        }
      });
    }
  }, [data]);

  return <div className="profilepostscount">{count}</div>;
}

export default function Profile() {
    return (
      <div className='profile'>
        <div className='profileHead'>
          <img src={accountList[0].url} alt={accountList[0].id}/>
          <div className='profileHeadInner'>
            <div className='profileHeadInnerOne'>
              <p>{accountList[0].id}</p>
              <Button variant='text'>Edit Profile</Button>
              <TbSettings2 color="white" size={20}/>
            </div>
            <div className='profileHeadInnerTwo'>
              <div className='profileHeadIITOne'>
                <CountPosts/>
                <p>posts</p>
              </div>
              <div className='profileHeadIITTwo'>
                <div className="profileFollowers">{accountList[0].followers}</div>
                <p>followers</p>
              </div>
              <div className='profileHeadIITThree'>
                <div className="profileFollowers">{accountList[0].following}</div>
                <p>following</p>
              </div>
            </div>
            <div className="profileHeadInnerThree">
              <p>{accountList.name}</p>
            </div>
            <div className="profileHeadInnerFour">
              <p>{accountList.description}</p>
            </div>
            <div className="profileHeadLink">
              <a href={accountList.url}>{accountList.url}</a>
              {/*Later we can add link data in accountList*/}
            </div>
          </div>
        </div>
        <div className="savedStories"></div>
        {/*later can be added */}
        {/*a posts reels tagged can be added through route*/}
        <div className="ProfilePosts">
          accountList[0].posts.map((profileAccountPosts) => (
            <div className='profileImages'>
                <img src={profileAccountPosts.imageurl} alt={profileAccountPosts.caption} />
            </div>
          ))
        </div>
      </div>
    );
}
