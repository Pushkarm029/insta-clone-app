import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { GrHomeRounded } from 'react-icons/gr';
import { FiSearch, FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { BsCameraVideo } from 'react-icons/bs';
import { BiMessageSquareDots } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { CiSquarePlus } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import './App.css';

export default function Navigation() {
  return (
    <div className="navigation">
      <p>Instagram</p>
      <div className='navigation-middle'>
        <div className='NavigationHome'>
          <Link to="/../home/app.js">
            <Button variant='text'>
              <GrHomeRounded/>
              Home
            </Button>
          </Link>
        </div>
        <div className='NavigationSearch'>
          <Link to="/">
            <Button variant='text'>
              <FiSearch/>
              Search
            </Button>
          </Link>
        </div>
        <div className='NavigationExplore'>
          <Link to="/">
            <Button variant='text'>
              <MdOutlineExplore/>
              Explore
            </Button>
          </Link>
        </div>
        <div className='NavigationReels'>
          <Link to="/">
            <Button variant='text'>
              <BsCameraVideo/>
              Reels
            </Button>
          </Link>
        </div>
        <div className='NavigationMessages'>
          <Link to="/">
            <Button variant='text'>
              <BiMessageSquareDots/>
              Messages
            </Button>
          </Link>
        </div>
        <div className='NavigationNotifications'>
          <Link to="/">
            <Button variant='text'>
              <AiOutlineHeart/>
              Notifications
            </Button>
          </Link>
        </div>
        <div className='NavigationCreate'>
          <Link to="/">
            <Button variant='text'>
              <CiSquarePlus/>
              Create
            </Button>
          </Link>
        </div>
        <div className='NavigationProfile'>
          <Link to="/">
            <Button variant='text'>
              <CgProfile/>
              Profile
            </Button>
          </Link>
        </div>
      </div>
      {/* Separate More Button from here */}
      <div className='NavigationMore'>
          <Link to="/">
            <Button variant='text'>
              <FiMoreHorizontal/>
              More
            </Button>
          </Link>
      </div>
    </div>
  );
}