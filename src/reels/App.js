import React from 'react';
import ReactPlayer from 'react-player';
import  {BsMusicNoteList} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import {FiMessageCircle} from 'react-icons/fi';
import {FaTelegramPlane} from 'react-icons/fa';
import {FiMoreHorizontal} from 'react-icons/fi';
import {BsBookmark} from 'react-icons/bs';
import './App.css';
import { reelsList } from '../data/reels';

export default function Reels() {
    return (
      <div className='reels'>
        {reelsList.map((reels) => (
          <div className='reel'>
            <div className='reelsSectionOne'>
              <ReactPlayer 
                className='reelVideoPlayer'
                width='369px'
                height='525px'
                url= {reels.url}
              />
              <div className='reelsSectionOneHeader'>
                <div className='reelsSectionOProfile'>
                  <img src={reels.imageurl}></img>
                  <p>{reels.id} &#183;</p>
                  <h2>Follow</h2>
                </div>
                <div className='reelsCaption'>
                  <p>{reels.description}</p>
                </div>
                <div className='reelsAudioTitle'>
                  <BsMusicNoteList size={12} color="white" style={{padding :'2px'}}/>
                  <p>{reels.audio}</p>
                </div>
              </div>
            </div>
            <div className='reelsSectionTwo'>
              <div className='reelsSectionTwoLike'>
                <AiOutlineHeart size={27} color="white" style={{padding :'2px'}}/>
                <p>{reels.likes}</p>
              </div>
              <div className='reelsSectionTwoComments'>
                <FiMessageCircle size={27} color="white" style={{padding :'2px'}}/>
                <p>{reels.comments}</p>
              </div>
              <div className='reelsSectionTwoForward'>
                <FaTelegramPlane size={27} color="white" style={{padding :'2px'}}/>
              </div>
              <div className='reelsSectionTwoBookmark'>
                <BsBookmark size={27} color="white" style={{padding :'2px'}}/>
              </div>
              <div className='reelsSectionTwoMore'>
                <FiMoreHorizontal size={27} color="white" style={{padding :'2px'}}/>
              </div>
              <div className='reelsSectionTwoAudioOwner'>
                <img src={reels.imageurl}></img>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }