import React, { useState, useEffect, lazy, Suspense } from 'react';
import { accountList } from '../data/account';
import { MdArrowDropDown } from 'react-icons/md';
import { IoMdCreate } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';
import './App.css';

const LazyAccountInMessages = lazy(() => import('./AccountInMessages'));

export default function Messages() {
  const [lazyLoad, setLazyLoad] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        setLazyLoad(false);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="messages">
      <div className="messagesContainer">
        <div className="leftMessages">
          <div className="topMessagesSection">
            <div className="topMessageGT">
              <p>{accountList[0].id}</p>
              <MdArrowDropDown size={37} color="white" style={{ padding: '0px' }} />
            </div>
            <IoMdCreate size={18} color="white" style={{ padding: '10px' }} />
          </div>
          <div className="primaryGeneralMessages">
            <p>PRIMARY</p>
            <p>GENERAL</p>
          </div>
          <div className="accountsInMessagesHead">
            {accountList.slice(1, lazyLoad ? 8 : undefined).map((account) => (
              <Suspense key={account.id} fallback={<div className='loadingInMessages'>Loading...</div>}>
                <LazyAccountInMessages account={account} />
              </Suspense>
            ))}
          </div>
        </div>
        <div className="rightMessages">
          <MdOutlineMessage size={75} color="white" style={{ padding: '10px' }} />
          <p className="yourMessagesInMessages">Your Messages</p>
          <p className="sendMessagesInMessages">Send private photos and messages to a friend or group.</p>
          <div className="sendMessageButton">Send message</div>
        </div>
      </div>
    </div>
  );
}