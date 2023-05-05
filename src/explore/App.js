import './App.css';
import { exploreList } from './../data/explore';


export default function Explore() {
    return (
      <div className='randomexploreposts'>
        {exploreList.map((Explore) => (
          <div className='exploreImages'>
              <img src={Explore.url} alt={Explore.url} />
          </div>
        ))}
      </div>
    );
  }