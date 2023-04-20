import React, { useState } from 'react';
import Home from './../home/App';
import Search from './../overlay/search/App'
import Explore from './../explore/App';
import Reels from './../reels/App';
import Messages from './../messages/App';
import Notifications from './../overlay/notifications/App';
import Create from './../overlay/create/App';
import Profile from './../profile/App';
import More from './../overlay/more/App';
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

const components = {
  home: Home,
  search: Search,
  explore: Explore,
  reels: Reels,
  messages: Messages,
  notifications: Notifications,
  create: Create,
  profile: Profile,
  more: More
};

const icons = {
  home: GrHomeRounded,
  search: FiSearch,
  explore: MdOutlineExplore,
  reels: BsCameraVideo,
  messages: BiMessageSquareDots,
  notifications: AiOutlineHeart,
  create: CiSquarePlus,
  profile: CgProfile,
  more: FiMoreHorizontal
};

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleClick = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="navigation">
      <p>Instagram</p>
      <div className='navigation-middle'>
        {Object.keys(components).map((page) => (
          <Button key={page} onClick={() => handleClick(page)} className="navigation-component">
            {React.createElement(icons[page])}
            <p>{page.charAt(0).toUpperCase() + page.slice(1)}</p>
          </Button>
        ))}
      </div>
      {/* Separate More Button from here */}
      {React.createElement(components[currentPage])}
    </div>
  );
}

export default Navigation;