import React, { useState } from 'react';
import Overlay from './../overlay/notifications/App';
import Navigation from './App';

export default function NavNotifications({ handleOverlayVisible }) {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleClick = () => {
    setOverlayVisible(true);
    handleOverlayVisible(true);
  };

  return (
    <div>
      <Navigation handleClick={handleClick}/>
      {overlayVisible && <Overlay />}
      {/* other content */}
    </div>
  );
}
