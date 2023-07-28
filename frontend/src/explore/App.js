import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2Filled } from "react-icons/tb";
import "./App.css";
import { OverlayTest as ShowOverlay } from "./../overlay/overlay.js";

export default function Explore() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`/api/explore/posts`, {
      headers: {
        Accept: 'application/json'
      },
      signal,
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          console.log('API Response Data:', data);
          setData(data);
        } else {
          console.error('Invalid API response:', data);
          setData([]);
        }
      })
      .catch(error => {
        console.error('Error fetching images links:', error);
        setData([]);
      });

    return () => {
      abortController.abort();
    };
  }, []);
  const [hoverExploreIMG, setHoverExploreIMG] = useState(null);
  const [ShowOverlayState, setShowOverlayState] = useState([
    false,
    "",
    "",
    "",
    "",
    "",
  ]);
  const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID, overlayEmail] =
    ShowOverlayState;

  const handleOverlayStateChange = () => {
    setShowOverlayState((prevState) => [!prevState[0], ...prevState.slice(1)]);
  };

  const filteredData = data.filter(item => item.userPosts !== null && Array.isArray(item.userPosts) && item.userPosts.length > 0);

  return (
    <div className="randomexploreposts">
      {showOverlay && (
        <ShowOverlay
          onStateChange={handleOverlayStateChange}
          OverAcID={overlayId}
          OverAcCaption={overlayCaption}
          OverAcLikes={overlayLikes}
          OverAcImages={overlayImageID}
          OverAcEmail={overlayEmail}
        />
      )}
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((Explore, index) => (
          <div
            key={index}
            onClick={() =>
              setShowOverlayState([
                true,
                Explore.userData.username,
                Explore.userPosts[0].caption,
                Explore.userPosts[0].like,
                Explore.userPosts[0].image_link,
                Explore.userData.email,
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
                    <p>{Explore.userPosts[0].like}</p>
                  </div>
                  <div className="hoverOverlayExploreComment">
                    <TbMessageCircle2Filled size={25} color="white" />
                    {Explore.userPosts[0].comments && Explore.userPosts[0].comments.length > 0 ? (<p>{Explore.userPosts[0].comments.length}</p>) : (<p>0</p>)}
                  </div>
                </div>
              </div>
            )}
            <img src={Explore.userPosts[0].image_link} alt={Explore.userPosts[0].image_link} />
          </div>
        ))
      ) : (<p>Loading Bro......</p>)}
    </div>
  );
}
