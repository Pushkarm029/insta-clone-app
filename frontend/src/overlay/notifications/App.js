import './App.css';
import {accountList} from "./../../data/account";

export default function Notifications() {
    return (
      <div className='notifications'>
        <h1> Notifications </h1>
        <h2>Today </h2>
        {accountList.slice(3, 4).map((account) => (
          <div key={account.id} className="notificationSubElement">
            <img src={account.url} alt={account.name} />
            <p>{account.id} started following you.</p>
            <button>following</button>
          </div>
        ))}
        <h2>This Week</h2>
        {accountList.slice(1, 2).map((account) => (
          <div key={account.id} className="notificationSubElement">
            <img src={account.url} alt={account.name} />
            <p>{account.id} liked your story.</p>
          </div>
        ))}
        <h2>This Month</h2>
        {accountList.slice(5, 6).map((account) => (
          <div key={account.id} className="notificationSubElement">
            <img src={account.url} alt={account.name} />
            <p>{account.id} liked your photo.</p>
          </div>
        ))}
        <h2>Earlier</h2>
        {accountList.slice(7).map((account) => (
          <div key={account.id} className="notificationSubElement">
            <img src={account.url} alt={account.name} />
            <p>{account.id} ..................</p>
          </div>
        ))}
      </div>
    );
  }