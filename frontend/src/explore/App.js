import { exploreList } from "./../data/explore";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2Filled } from "react-icons/tb";
import "./App.css";
import { OverlayTest as ShowOverlay } from "./../overlay/overlay.js";

function randomize(arr) {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function Explore() {
  const [randomizedExploreList, setRandomizedExploreList] = useState(
    randomize(exploreList)
  );
  const [hoverExploreIMG, setHoverExploreIMG] = useState(null);
  const [ShowOverlayState, setShowOverlayState] = useState([
    false,
    "",
    "",
    "",
    "",
  ]);
  const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID] =
    ShowOverlayState;

  const handleOverlayStateChange = () => {
    setShowOverlayState((prevState) => [!prevState[0], ...prevState.slice(1)]);
  };
  return (
    <div className="randomexploreposts">
      {showOverlay && (
        <ShowOverlay
          onStateChange={handleOverlayStateChange}
          OverAcID={overlayId}
          OverAcCaption={overlayCaption}
          OverAcLikes={overlayLikes}
          OverAcImages={overlayImageID}
        />
      )}
      {randomizedExploreList.map((Explore, index) => (
        <div
          key={index}
          onClick={() =>
            setShowOverlayState([
              true,
              Explore.id,
              Explore.caption,
              Explore.likes,
              Explore.url,
            ])
          }
          onMouseEnter={() => setHoverExploreIMG(index)}
          onMouseLeave={() => setHoverExploreIMG(null)}
          className="exploreImages"
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

// Modified Code
// import { useState, useEffect } from "react";
// import { AiFillHeart } from "react-icons/ai";
// import { TbMessageCircle2Filled } from "react-icons/tb";
// import { OverlayTest as ShowOverlay } from "./../overlay/overlay.js";
// import "./App.css";

// function randomize(arr) {
//   const shuffledArray = [...arr];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i].userData, shuffledArray[j].userData] = [shuffledArray[j].userData, shuffledArray[i].userData];
//     [shuffledArray[i].userPosts, shuffledArray[j].userPosts] = [shuffledArray[j].userPosts, shuffledArray[i].userPosts];
//   }
//   return shuffledArray;
// }

// export default function Explore() {
//   const [data, setData] = useState([]);
//   const [randomizedExploreList, setRandomizedExploreList] = useState([]);
//   const [hoverExploreIMG, setHoverExploreIMG] = useState(null);
//   const [ShowOverlayState, setShowOverlayState] = useState([false, "", "", "", ""]);
//   const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID] = ShowOverlayState;
//   const [userData, setUserData] = useState([]);
//   const [userPosts, setUserPosts] = useState([]);

//   useEffect(() => {
//     const abortController = new AbortController();
//     const signal = abortController.signal;
//     fetch(`/api/explore/posts`, {
//       headers: {
//         Accept: "application/json",
//       },
//       signal,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching images links:", error);
//         setData([]);
//       });

//     return () => {
//       abortController.abort();
//     };
//   }, []);

//   useEffect(() => {
//     if (data.length > 0) {
//       const randomizedData = randomize(data);
//       setRandomizedExploreList(randomizedData);
//       processAllData(randomizedData);
//     }
//   }, [data]);

//   const processAllData = (randomizedData) => {
//     const processedUserData = [];
//     const processedUserPosts = [];
//     randomizedData.forEach((element) => {
//       processedUserData.push(element.userData);
//       processedUserPosts.push(element.userPosts);
//     });
//     setUserData(processedUserData);
//     setUserPosts(processedUserPosts);
//   };

//   const handleOverlayStateChange = () => {
//     setShowOverlayState((prevState) => [!prevState[0], ...prevState.slice(1)]);
//   };

//   return (
//     <div className="randomexploreposts">
//       {showOverlay && (
//         <ShowOverlay
//           onStateChange={handleOverlayStateChange}
//           OverAcID={overlayId}
//           OverAcCaption={overlayCaption}
//           OverAcLikes={overlayLikes}
//           OverAcImages={overlayImageID}
//         />
//       )}
//       {randomizedExploreList.map((Explore, index) => (
//         <div
//           key={index}
//           onClick={() =>
//             setShowOverlayState([
//               true,
//               Explore.id,
//               Explore.caption,
//               Explore.likes,
//               Explore.url,
//             ])
//           }
//           onMouseEnter={() => setHoverExploreIMG(index)}
//           onMouseLeave={() => setHoverExploreIMG(null)}
//           className="exploreImages"
//         >
//           {hoverExploreIMG === index && (
//             <div className="hoverOverlayExplore">
//               <div className="hoverOverlayExploreContent">
//                 <div className="hoverOverlayExploreLike">
//                   <AiFillHeart size={25} color="white" />
//                   <p>{Explore.likes}</p>
//                 </div>
//                 <div className="hoverOverlayExploreComment">
//                   <TbMessageCircle2Filled size={25} color="white" />
//                   <p>{Explore.comments}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//           <img src={Explore.url} alt={Explore.url} />
//         </div>
//       ))}
//     </div>
//   );
// }
