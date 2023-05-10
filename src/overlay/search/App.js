import { accountList } from '../../data/account';
import './App.css';
import { useState } from 'react';
export default function Search() {
  return (
    <div className='search'>
      <h1>Search</h1>
      <label>
        <input type="text" placeholder="Search" name="name" />
      </label>
      <div className='recentSearch'>
        <h2>Recent</h2>
        <p>Clear All</p>
      </div>
      <div className='recentAccounts'>
        <div className='recentAccountPartOne'>
          <img src={accountList[1].url} alt={accountList[1].name} />
          <div className='recentAccountsText'>
            <h6>{accountList[1].id}</h6>
            <p>{accountList[1].name}</p>
          </div>
        </div>
        <h4>X</h4>
      </div>
    </div>
  );
}