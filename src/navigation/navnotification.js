import React, { useState } from 'react';
import Overlay from './../overlay/notifications/App';
import Navigation from './App';

export default function NavNotifications() {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleOverlayVisible = (visible) => {
    setOverlayVisible(visible);
  };

  return (
    <div>
      <Navigation handleOverlayVisible={handleOverlayVisible} />
      {overlayVisible && <Overlay />}
      {/* other content */}
    </div>
  );
}
