import React, {useState, useEffect, CSSProperties} from 'react';
import Home from './home/App';
import Navigation from './navigation/App'
import Search from './overlay/search/App'
import Explore from './explore/App';
import Reels from './reels/App';
import Messages from './messages/App';
import Create from './overlay/create/App';
import Profile from './profile/App';
import More from './overlay/more/App';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import './App.css';
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  padding: "331.5px 0px",
};

export default function Navigator() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <div className='App'>
      {
        loading ?
        <HashLoader
          className='loader'
          color={'#ffffff'}
          loading={loading}
          size={50}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <Router>
          <Navigation/>
          <Routes>
            <Route exact path="/insta-clone-app/" element={<Home />} />
            <Route path='/Search' element={<Search />} />
            <Route path='/Explore' element={<Explore />} />
            <Route path='/Reels' element={<Reels />} />
            <Route path='/Messages' element={<Messages />} />
            <Route path='/Create' element={<Create />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/More' element={<More />} />
          </Routes>
      </Router>
      }
    </div>
  );
}