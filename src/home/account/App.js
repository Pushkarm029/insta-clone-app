import Button from '@material-ui/core/Button';
import { accountList } from './../../data/account';
import './App.css';


export default function Account() {
    return (
      <div className='account'>
        <div className='myaccount'>
          <img src = {accountList[0].url}/>
          <>
            <p>{accountList[0].id}</p>
            <p>{accountList[0].name}</p>
          </>
          <Button variant='text'>switch</Button>
        </div>
        <div className='suggestions'>
          <div className='account-top'>
            <h2>Suggestions for you</h2>
            <Button variant='text'>See All</Button>
          </div>
          <div className='account-middle'>
            {accountList.slice(1,5).map((account) => (
              <div key={account.id}>
                <img src={account.url} alt={account.name} />
                <p>{account.id}</p>
                <p>{account.name}</p>
                <Button variant='text'>Follow</Button>
              </div>
            ))}
          </div>
        </div>
        <div className='accountfooter'>
          <a href='#'>About</a>
          <a href='#'>Help</a>
          <a href='#'>Press</a>
          <a href='#'>API</a>
          <a href='#'>Jobs</a>
          <a href='#'>Privacy</a>
          <a href='#'>Terms</a>
          <a href='#'>Loactions</a>
          <a href='#'>Language</a>
          <a href='#'>Meta Verified</a>
        </div>
        <div className = 'copyrightaccount'>
          <p>© 2023 INSTAGRAM FROM META</p>
        </div>
      </div>
    );
}