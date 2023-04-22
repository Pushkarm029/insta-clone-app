import './App.css';
import Account from './account/App';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from './body/App';
import Navigation from '../navigation/App';

export default function Home() {
    return (
      <div className='home'>
        <Router>
          <Navigation/>
        </Router>
        <div className='greyline'></div>
        <Body/>
        <Account/>
      </div>
    );
  }