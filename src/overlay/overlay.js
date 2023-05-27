import React from 'react';
import './overlay.css';
import {FiMoreHorizontal} from 'react-icons/fi';

export default function OverlayTest(){
    return(
        <div className='overlay'>
            <div className='overlayLeft'>
                {/* image can be added when this is used as a component with a prop */}
            </div>
            <div className='overlayRight'>
                <div className='overlayRightTop'>
                    <div className='overlayRightTT'>
                        <img/>
                        <p className='overlayUsername'>Username</p>
                        <p className='overlayRightTopText'>Location</p>
                    </div>
                    <FiMoreHorizontal color="white" size={20} />
                </div>
                <div className='overlayRightMiddle'>
                    <div className='overlayRightMiddleLeft'>
                        <img/>
                    </div>
                    <div className='overlayRightMiddleRight'>
                        <p className='overlayUsername'>Username</p>
                        <p className='overlayCaption'>Caption example</p>
                        <p className='overlayDuration'>Duration</p>
                    </div>
                </div>
                <div className='overlayRightBottom'>
                    <div className='overlayRightBottomTop'>

                    </div>
                    <div className='overlayRightBottomMiddle'>
                        {/* like meter */}
                    </div>
                    <div className='overlayRightBottomBottom'>
                        {/* comment button */}
                    </div>
                </div>
            </div>
        </div>
    );
}
