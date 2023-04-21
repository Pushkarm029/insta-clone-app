import './App.css';
import Account from './account/App';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from './body/App';
import Navigation from '../navigation/App';

export default function Home() {
    return (
      <>
        <Router>
          <Navigation/>
        </Router>
        <Body/>
        <Account/>
      </>
    );
  }