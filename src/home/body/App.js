import "./App.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { accountList } from "./../../data/account";
import {AiOutlineHeart} from "react-icons/ai";
import {FiMessageSquare} from "react-icons/fi";
import {RiShareForwardLine} from "react-icons/ri";
import {FiBookmark} from "react-icons/fi";

function CheckUsername(text){
  let length = text.length;
  if(length>=11){
    return text.slice(0,8) + "...";
  }
  else{
    return text;
  }
}

export default function Body() {
  return (
    <div className="body">
      <div className="stories">
        {accountList.slice(0, 8).map((account) => (
          <div key={account.id} className="storyinner">
            <img src={account.url} alt={account.name} />
            <p>{CheckUsername(account.id)}</p>
          </div>
        ))}
      </div>
      <div className="posts">
        {accountList.slice(1).map((account) => (
          <div className="post" key={account.id}>
            <div className="postheader">
              <img src={account.url} alt={account.id} />
              <p>{account.id}</p>
              <p>1 Day Ago</p>
              <FiMoreHorizontal />
            </div>
            <div>
              {account.posts.length > 0 ? (
                account.posts.map((post) => (
                  <div key={post.number}>
                    <div className="postimage">
                      <img src={post.imageurl} alt="" />
                    </div>
                    <div className="interactablepost">
                      <div className="interactablepostleft">
                        <AiOutlineHeart/>
                        <FiMessageSquare/>
                        <RiShareForwardLine/>
                      </div>
                      <div className="interactablepostright">
                        <FiBookmark/>
                      </div>
                    </div>
                    <div className="postfooter">
                      <p>{post.likes} likes</p>
                      <div className="postfootercaption">
                        <p>{account.name}</p>
                        <p>{post.caption}</p>
                      </div>
                      <p>1 comment</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No post available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
