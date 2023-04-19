import React from 'react';
import Account from './account/App';
import Navigation from './body/App';
import Body from './navigation/App';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Body/>
      <Account/>
    </div>
  );
}

export default App;
