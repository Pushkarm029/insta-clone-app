import Button from '@material-ui/core/Button';
import { accountList } from './../../data/account';
import './App.css';


export default function Account() {
    return (
      <div className='account'>
        <div className='myaccount'>
          <div className='accounttoptext'>
            <img src = {accountList[0].url}/>
            <div className='myaccountinner'>
              <p>{accountList[0].id}</p>
              <p>{accountList[0].name}</p>
            </div>
          </div>
          <span className='accountswitchbutton'>switch</span>
        </div>
        <div className='suggestions'>
          <div className='account-top'>
            <p>Suggestions for you</p>
            <Button variant='text'>See All</Button>
          </div>
          <div className='account-middle'>
            {accountList.slice(1,5).map((account) => (
              <div key={account.id} className='accountmiddleflex'>
                <div className='accountmiddletext'>
                  <img src={account.url} alt={account.name} />
                  <div className='accountmiddletextholder'>
                    <p>{account.id}</p>
                    <p>{account.name}</p>
                  </div>
                </div>
                <Button variant='text'>Follow</Button>
              </div>
            ))}
          </div>
        </div>
        <div className='accountfooter'>
          <a href='#'>About</a>
          <p>&#183;</p>
          <a href='#'>Help</a>
          <p>&#183;</p>
          <a href='#'>Press</a>
          <p>&#183;</p>
          <a href='#'>API</a>
          <p>&#183;</p>
          <a href='#'>Jobs</a>
          <p>&#183;</p>
          <a href='#'>Privacy</a>
          <p>&#183;</p>
          <a href='#'>Terms</a>
          <p>&#183;</p>
          <a href='#'>Locations</a>
          <p>&#183;</p>
          <a href='#'>Language</a>
          <p>&#183;</p>
          <a href='#'>Meta Verified</a>
        </div>
        <div className = 'copyrightaccount'>
          <p>© 2023 INSTA-CLONE FROM @pushkarm029</p>
        </div>
      </div>
    );
}