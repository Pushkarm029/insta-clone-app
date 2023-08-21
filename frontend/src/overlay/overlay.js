import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { FiBookmark } from "react-icons/fi";
import "./overlay.css";
import { useNavigate } from "react-router-dom";
import { BsEmojiLaughing } from "react-icons/bs";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai"
import { useSelector } from 'react-redux';
import { useRef } from "react";
import { useEffect } from "react";

// current idea to implement overlay is that it will be a component that is called when a post is clicked on and will be passed the post data as props
// so overlayTest need some props to be passed to it

export function OverlayTest({ OverAcID, OverAcCaption, OverAcLikes, OverAcImages, onStateChange, OverAcEmail }) {
    const [liked, setLiked] = useState(false);
    const userEmail = useSelector((state) => state.user.userEmail);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const handleNavigateToProfile = () => {
        navigate(`/profile?prop=${OverAcEmail}`);
    };
    const postLikeUpdateData = {
        likes: OverAcLikes,
        operation: "like",
    }
    const postDisLikeUpdateData = {
        likes: OverAcLikes,
        operation: "dislike",
    }
    // to shorten the image link
    const modifiedUrl = OverAcImages.replace('https://firebasestorage.googleapis.com/v0/b/insta-clone-app-77662.appspot.com/o/', '');
    const likeHandler = async () => {
        try {
            // Toggle the liked state using the callback form of setLiked
            setLiked((prevLiked) => !prevLiked);
            // Use the updated liked state to determine postUpdateData
            const postUpdateData = liked ? postDisLikeUpdateData : postLikeUpdateData;
            const response = await fetch(`/api/like/${OverAcEmail}/${encodeURIComponent(modifiedUrl)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postUpdateData),
            });
            if (response.ok) {
                console.log('Data posted successfully to the backend!');
            } else {
                // Handle error response from the backend
                console.error('Error posting data:', response.statusText);
            }
            // No need to setLiked(true) here, as it was already updated with the callback form
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    const [commentData, setCommentData] = useState([[]]);
    const handleCommentPost = async (e) => {
        e.preventDefault();
        const inputValue = inputRef.current.value;
        const postCommentData = {
            comment: inputValue,
            currentUser: userEmail,
        }
        // console.log(postCommentData)
        try {
            const response = await fetch(`/api/comment/post/${OverAcEmail}/${encodeURIComponent(modifiedUrl)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postCommentData),
            });

            if (response.ok) {
                console.log(postCommentData);
                if (!commentData) {
                    setCommentData([postCommentData]);
                } else {
                    setCommentData(prevComments => [...prevComments, postCommentData]);
                }
                inputRef.current.value = '';
                console.log('Data posted successfully to the backend!');
            } else {
                console.error('Error posting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const urlModEncoder = encodeURIComponent(modifiedUrl);
        fetch(`/api/comment/get/${OverAcEmail}/${urlModEncoder}`, {
            headers: {
                Accept: 'application/json',
            },
            signal,
        })
            .then(response => response.json())
            .then(data => {
                console.log('API Response Data:', data);
                setCommentData(data);
            })
            .catch(error => {
                console.error('Error fetching images links:', error);
                setCommentData([[]]);
            });

        return () => {
            abortController.abort();
        };
    }, []);
    return (
        <div className="overlay">
            <div className="overlaybg" onClick={onStateChange}></div>
            <div className="overlayInner">
                <div className="overlayLeft">
                    <img
                        src={OverAcImages}
                        alt="test"
                    />
                </div>
                <hr color="#262626" align="center"></hr>
                <div className="overlayRight">
                    <div className="overlayRightTT">
                        <div className="overlayRightTop">
                            <div className="overlayRightTopLeft">
                                {/* API call for profile image */}
                                <img
                                    src="https://images.unsplash.com/photo-1686452975139-bbb8846dd7e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
                                    alt="profileimg"
                                />
                                <div className="overlayRightTM">
                                    <p onClick={handleNavigateToProfile} className="overlayUsername">{OverAcID}</p>
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
                                <p onClick={handleNavigateToProfile} className="overlayUsername">{OverAcID}</p>
                                <p className="overlayRightTopText">
                                    {OverAcCaption}
                                </p>
                                <p className="overlayDuration">1 w</p>
                            </div>
                        </div>
                    </div>
                    <div className="overlayRightCommentSection">
                        {commentData && commentData.map((eachCommentPacket) => (
                            <div className="eachCommentBox">
                                {/* currently placeholder */}
                                <img src="https://images.unsplash.com/photo-1690907932520-8ac437939237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=771&q=80" />
                                <div className="eachCommentText">
                                    <p className="usernameEachComment"><strong>{eachCommentPacket.currentUser}</strong></p>
                                    <p className="commentEachComment">{eachCommentPacket.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* create comment section where data is commentData */}
                    <div className="overlayRightBottom">
                        <hr color="#262626" align="center"></hr>
                        <div className="overlayRightBottomTop">
                            <div className="ORBTL">
                                {liked ? (
                                    <AiFillHeart onClick={likeHandler} size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                                ) : (
                                    <AiOutlineHeart onClick={likeHandler} size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                                )}
                                <FiMessageSquare size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                                <RiShareForwardLine size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                            </div>
                            <div className="ORBTR">
                                <FiBookmark size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                            </div>
                        </div>
                        <div className="overlayRightBottomMiddle">
                            <p className="overlayRightBottomMiddleText">{liked ? (parseInt(OverAcLikes) + 1) : (OverAcLikes)} likes</p>
                            {/*currently i will only show no of likes */}
                        </div>
                        <hr color="#262626" align="center"></hr>
                        <form onSubmit={handleCommentPost} className="overlayRightBottomBottom">
                            <BsEmojiLaughing size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                            <input ref={inputRef} type="text" placeholder="Add a Comment..." />
                            <button className="commentPostButton">Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
