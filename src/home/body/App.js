import './App.css';
import {FiMoreHorizontal} from 'react-icons/fi';
import { accountList } from './../../data/account';

export default function Body() {
    return (
      <div className='body'>
        <div className='stories'>
          
        </div>
        <div className='posts'>
          <div className='post'>
            <div className='postheader'>
              <img src = {accountList[1].url} alt = {accountList[1].id} />
              <p>{accountList[1].id}</p>                 {/* username */}
              <p> 1 Day Ago</p>                 {/* 1 day ago */}
              <FiMoreHorizontal/>
            </div>
            <div className='postimage'>  {/* add multiple images */}
              <img src={accountList[0].posts[0].imageurl} alt='' />
            </div>
            <p>{accountList[0].posts[0].number}</p> {/*code working*/}
            <div className='interactablepost'>
              <div className='interactablepostleft'></div>
              <div className='interactablepostright'></div>
            </div>
            <div className='postfooter'>
              <p></p>                 {/* 1 like */}
              <div className='postfootercaption'>
                <p></p>                 {/* username */}
                <p></p>                 {/* caption */} 
              </div>
              <p></p>                   {/* 1 comment */}
            </div>
          </div>
        </div>
      </div>
    );
  }