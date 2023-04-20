import './App.css';
import {FiMoreHorizontal} from 'react-icons/fi';

export default function Body() {
    return (
      <div className='body'>
        <div className='stories'>
          
        </div>
        <div className='posts'>
          <div className='post'>
            <div className='postheader'>
              <img src='' alt='' />
              <p></p>                 {/* username */}
              <p></p>                 {/* 1 day ago */}
              <FiMoreHorizontal/>
            </div>
            <div className='postimage'>  {/* add multiple images */}
              <img src='' alt='' />
            </div>
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