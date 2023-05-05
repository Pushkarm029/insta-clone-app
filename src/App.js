import React from 'react';
import Home from './home/App';
import Navigation from './navigation/App'
import Search from './overlay/search/App'
import Explore from './explore/App';
import Reels from './reels/App';
import Messages from './messages/App';
import Notifications from './overlay/notifications/App';
import Create from './overlay/create/App';
import Profile from './profile/App';
import More from './overlay/more/App';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navigation/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/Explore' element={<Explore />} />
          <Route path='/Reels' element={<Reels />} />
          <Route path='/Messages' element={<Messages />} />
          <Route path='/Notifications' element={<Notifications />} />
          <Route path='/Create' element={<Create />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/More' element={<More />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
