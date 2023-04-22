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
              <BiHomeSmile size={27} color="white" style={{padding :'10px'}}/>
              Home
            </button>
          </Link>
        </div>
        <div className='NavigationSearch'>
          <Link to="/">
            <button className='blockbutton' style={{color: 'white'}}>
              <FiSearch size={27} color="white" style={{padding :'10px'}}/>
              Search
            </button>
          </Link>
        </div>
        <div className='NavigationExplore'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <MdOutlineExplore size={27} color="white" style={{padding :'10px'}}/>
              Explore
            </button>
          </Link>
        </div>
        <div className='NavigationReels'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <BsCameraVideo size={27} color="white" style={{padding :'10px'}}/>
              Reels
            </button>
          </Link>
        </div>
        <div className='NavigationMessages'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <BiMessageSquareDots size={27} color="white" style={{padding :'10px'}}/>
              Messages
            </button>
          </Link>
        </div>
        <div className='NavigationNotifications'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <AiOutlineHeart size={27} color="white" style={{padding :'10px'}}/>
              Notifications
            </button>
          </Link>
        </div>
        <div className='NavigationCreate'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <FaPlus size={27} color="white" style={{padding :'10px'}}/>
              Create
            </button>
          </Link>
        </div>
        <div className='NavigationProfile'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <CgProfile size={27} color="white" style={{padding :'10px'}}/>
              Profile
            </button>
          </Link>
        </div>
      </div>
      {/* Separate More Button from here */}
      <div className='NavigationMore'>
          <Link to="/">
            <button style={{color: 'white'}}>
              <FiMoreHorizontal size={27} color="white" style={{padding :'10px'}}/>
              More
            </button>
          </Link>
      </div>
    </div>
  );
}