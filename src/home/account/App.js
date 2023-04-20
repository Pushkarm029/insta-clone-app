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
          <h2>Suggestions for you</h2>
          <div className='navigation-middle'>
            {accountList.slice(1).map((account) => (
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

        </div>
        <div className = 'copyrightaccount'>

        </div>
      </div>
    );
}