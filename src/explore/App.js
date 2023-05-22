import { exploreList } from './../data/explore';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { TbMessageCircle2Filled } from "react-icons/tb";
import './App.css';

function randomize(arr) {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function Explore() {
  const [randomizedExploreList, setRandomizedExploreList] = useState(randomize(exploreList));
  const [hoverExploreIMG, setHoverExploreIMG] = useState(null);
    return (
      <div className='randomexploreposts'>
        {randomizedExploreList.map((Explore, index) => (
          <div 
            key={index}
            onMouseEnter={() => setHoverExploreIMG(index)}
            onMouseLeave={() => setHoverExploreIMG(null)}
            className='exploreImages'
          >
            {hoverExploreIMG === index && (
              <div className="hoverOverlayExplore">
                <div className="hoverOverlayExploreContent">
                  <div className="hoverOverlayExploreLike">
                    <AiFillHeart size={25} color="white" />
                    <p>{Explore.likes}</p>
                  </div>
                  <div className="hoverOverlayExploreComment">
                    <TbMessageCircle2Filled size={25} color="white" />
                    <p>{Explore.comments}</p>
                  </div>
                </div>
              </div>
            )}
            <img src={Explore.url} alt={Explore.url} />
          </div>
        ))}
      </div>
    );
  }