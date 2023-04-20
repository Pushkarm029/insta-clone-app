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

        </div>
        <div className='accountfooter'>

        </div>
        <div className = 'copyrightaccount'>

        </div>
      </div>
    );
}