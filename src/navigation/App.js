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
    const [currentPage, setCurrentPage] = useState('home');

    const handleClick = (page) => {
      setCurrentPage(page);
    }

    
    return (
        <div className="navigation">
            <p>
                Instagram
            </p>
            <div>
                <button onClick={() => handleClick('home')} className="navigation-component">
                    <GrHomeRounded/>   
                    {/* style={{fontSize: '24px' }}  */}
                    <p> Home </p>
                </button>
                <button onClick={() => handleClick('search')} className="navigation-component">
                    <FiSearch />
                    <p> Search </p>
                </button>
                <button onClick={() => handleClick('explore')} className="navigation-component">
                    <MdOutlineExplore />
                    <p> Explore </p>
                </button>
                <button onClick={() => handleClick('reels')} className="navigation-component">
                    <BsCameraVideo />
                    <p> Reels </p>
                </button>
                <button onClick={() => handleClick('messages')} className="navigation-component">
                    <BiMessageSquareDots />
                    <p> Messages </p>
                </button>
                <button onClick={() => handleClick('notifications')} className="navigation-component">
                    <AiOutlineHeart />
                    <p> Notifications </p>
                </button>
                <button onClick={() => handleClick('create')} className="navigation-component">
                    <CiSquarePlus />
                    <p> Create </p>
                </button>
                <button onClick={() => handleClick('profile')} className="navigation-component">
                    <CgProfile />
                    <p> Profile </p>
                </button>
            </div>
            <button onClick={() => handleClick('more')}  className="navigation-component" >
                <FiMoreHorizontal />
                <p> More </p>
            </button>
        

            {currentPage === 'home' && <Home />}
            {currentPage === 'search' && <Search />}
            {currentPage === 'explore' && <Explore />}
            {currentPage === 'reels' && <Reels />}
            {currentPage === 'messages' && <Messages />}
            {currentPage === 'notifications' && <Notifications />}
            {currentPage === 'create' && <Create />}
            {currentPage === 'profile' && <Profile />}
            {currentPage === 'more' && <More />}
        </div>
    );
}


