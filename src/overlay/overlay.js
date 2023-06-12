import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { FiBookmark } from "react-icons/fi";

import "./overlay.css";
import { BsEmojiLaughing } from "react-icons/bs";

export default function OverlayTest() {
  return (
    <div className="overlay">
        <div className="overlaybg"></div>
        <div className="overlayInner">
            <div className="overlayLeft">
                <img
                src="https://images.unsplash.com/photo-1686406835831-511dbf18b685?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                alt="test"
                />
                {/* image can be added when this is used as a component with a prop */}
            </div>
            <div className="overlayRight">
                <div className="overlayRightTT">
                    <div className="overlayRightTop">
                        <div className="overlayRightTopLeft">
                            <img
                                src="https://images.unsplash.com/photo-1686452975139-bbb8846dd7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
                                alt="profileimg"
                            />
                            <div className="overlayRightTM">
                                <p className="overlayUsername">Username</p>
                                <p className="overlayRightTopText">Location</p>
                            </div>
                        </div>
                        <FiMoreHorizontal size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                    </div>
                    <hr color="#262626" align="center"></hr>
                    <div className="overlayRightMiddle">
                        <img
                            src="https://images.unsplash.com/photo-1686452975139-bbb8846dd7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
                            alt="profileimg"
                        />
                        <div className="overlayRightMiddleRight">
                            <p className="overlayUsername">Username</p>
                            <p className="overlayRightTopText">
                            Caption example djs df sdf df sgdfe rerewre sfd a sd sd a d s d f
                            </p>
                            <p className="overlayDuration">1 w</p>
                        </div>
                    </div>
                </div>
                <div className="overlayRightBottom">
                    <hr color="#262626" align="center"></hr>
                    <div className="overlayRightBottomTop">
                        <div className="ORBTL">
                            <AiOutlineHeart size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                            <FiMessageSquare size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                            <RiShareForwardLine size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                        </div>
                        <div className="ORBTR">
                            <FiBookmark size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                        </div>
                    </div>
                    <div className="overlayRightBottomMiddle">
                        {/*currently i will only show no of likes */}
                    </div>
                    <hr color="#262626" align="center"></hr>
                    <div className="overlayRightBottomBottom">
                        <BsEmojiLaughing size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                        <p className="overlayRightBottomBottomText">Add a comment...</p>
                        <button >POST</button>
                        {/* comment button will be added later */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
