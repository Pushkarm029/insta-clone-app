import React from 'react';
import './App.css';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';

export default function Create() {
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://insta-clone-app-77662.appspot.com");
  const [caption, setCaption] = useState(null);
  // const [downloadURL, setDownloadURL] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // const [imageUploaded, setImageUploaded] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);
  const userEmail = useSelector((state) => state.user.userEmail);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // setImageUploaded(true);
      setFileUploaded(e.target.files[0]);
    }
  };
  const submitPost = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `images/${userEmail}` + Date.now());

    try {
      // Upload the image to Firebase Storage
      const snapshot = await uploadBytes(storageRef, fileUploaded);
      console.log('Uploaded file!');

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Image download URL:', downloadURL);
      // setDownloadURL(downloadURL);

      // Call the backend with the downloadURL and caption data
      const userData = { downloadURL, caption };
      processToBackend(userData);

    } catch (error) {
      console.error('Error uploading image or getting download URL:', error);
    }
    console.log('Post submitted');
  };

  const processToBackend = async (userData) => {
    try {
      const response = await fetch(`/api/upload/${userEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Data posted successfully to the backend!');
      } else {
        // Handle error response from the backend
        console.error('Error posting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  return (
    <div className="insta-overlay">
      <div className="headerUploadOverlay">
        <BiArrowBack size={25} />
        <p className='headerUploadOverlayText'>
          Create New Post
        </p>
        <p onClick={submitPost} className='headerUploadOverlayButton'>
          Share
        </p>
      </div>
      <div className="bodyUploadOverlay">
        <div className="left-section">
          {imagePreview && (
            <img src={imagePreview} alt="Uploaded" className="uploaded-image" />
          )}
        </div>
        <div className="right-section">
          {fileUploaded &&
            (<textarea
              className="caption-input"
              placeholder="Add Write a Caption..."
              rows="4"
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>)}
          <div className="upload-image-section">
            <label htmlFor="image-upload" className="upload-label">
              {fileUploaded ? "Change Image" : "Upload Image"}
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
