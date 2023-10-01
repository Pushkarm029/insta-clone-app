import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`/api/search/users`, {
      headers: {
        Accept: "application/json",
      },
      signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUserData([]);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const filteredData = userData.filter((item) =>
      item[0].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filteredData);
  }, [searchQuery, userData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (targetEmail) => {
    navigate(`/profile?prop=${targetEmail}`);
  };

  return (
    <div className="searchOverlay">
      <div className="container">
        <h1>Search</h1>
        <input
          type="text"
          maxLength={20}
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Type to search..."
          data-testid="search-input"
        />
        {searchQuery.length > 0 ? (
          filteredResults.length > 0 ? (
            <div className="searchResults">
              {filteredResults.map((result, index) => (
                <div
                  onClick={() => handleNavigation(result[4])}
                  className="eachSearchResult"
                  key={index}
                  data-testid="search-box-result"
                >
                  <img src={result[3]} alt={`Result ${index}`} />
                  <div className="eachSearchResultLeft">
                    <div className="eachSearchResultTop">
                      <p>
                        <strong>{result[0]}</strong>
                      </p>
                    </div>
                    <div className="eachSearchResultBottom">
                      <p className="eachSearchedUserName" data-testid="search-results">{result[2]}</p>
                      <p className="eachSearchedFollowers">
                        {result[1]} Followers
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              {searchQuery} is currently not available on this platform
            </p>
          )
        ) : (
          <p>No search results yet.</p>
        )}
      </div>
    </div>
  );
}
