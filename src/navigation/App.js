import React from 'react';
import { Link } from "react-router-dom";
import { BiHomeSmile } from 'react-icons/bi';
import { FiSearch, FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { BsCameraVideo } from 'react-icons/bs';
import { BiMessageSquareDots } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import './App.css';

export default function Navigation() {
  return (
    <div className="navigation">
      <p>Instagram</p>
      <div className='navigation-middle'>
        <div className='NavigationHome'>
          <Link to="/../home/app.js">
            <button className='blockbutton' style={{color: 'white'}}>
              <BiHomeSmile size={30} color="white" style={{padding :'10px'}}/>
              Home
            </button>
          </Link>
        </div>
        <div className='NavigationSearch'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <FiSearch color="white"/>
              Search
            </button>
          </Link>
        </div>
        <div className='NavigationExplore'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <MdOutlineExplore color="white"/>
              Explore
            </button>
          </Link>
        </div>
        <div className='NavigationReels'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <BsCameraVideo color="white"/>
              Reels
            </button>
          </Link>
        </div>
        <div className='NavigationMessages'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <BiMessageSquareDots color="white"/>
              Messages
            </button>
          </Link>
        </div>
        <div className='NavigationNotifications'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <AiOutlineHeart color="white"/>
              Notifications
            </button>
          </Link>
        </div>
        <div className='NavigationCreate'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <FaPlus color="white"/>
              Create
            </button>
          </Link>
        </div>
        <div className='NavigationProfile'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <CgProfile color="white"/>
              Profile
            </button>
          </Link>
        </div>
      </div>
      {/* Separate More Button from here */}
      <div className='NavigationMore'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <FiMoreHorizontal color="white"/>
              More
            </button>
          </Link>
      </div>
    </div>
  );
}