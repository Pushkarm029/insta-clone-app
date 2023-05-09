import React, { useState } from 'react';
import Overlay from './../overlay/notifications/App';
import Navigation from './Navigation';

function App() {
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <div>
      <Navigation setOverlayVisible={setOverlayVisible} />
      {overlayVisible && <Overlay />}
      {/* other content */}
    </div>
  );
}

export default App;