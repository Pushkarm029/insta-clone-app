import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [userData, setUserData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`/api/search/users`, {
      headers: {
        Accept: 'application/json',
      },
      signal, // Pass the signal to the fetch request
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response Data:', data);
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching images links:', error);
        setUserData([]);
      });

    return () => {
      abortController.abort(); // Cancel the fetch request when the component unmounts
    };
  }, []);

  useEffect(() => {
    // Filter the data based on the search query
    const filteredData = userData.filter((item) =>
      item[0].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filteredData);
  }, [searchQuery, userData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleNavigation = (targetEmail) => {
    navigate(`/profile?prop=${targetEmail}`)
  }

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
        />
        {searchQuery.length > 0 ? (
          filteredResults.length > 0 ? (
            <div className="searchResults">
              {filteredResults.map((result, index) => (
                <div onClick={() => handleNavigation(result[4])} className="eachSearchResult" key={index}>
                  <img src={result[3]} />
                  <div className="eachSearchResultLeft">
                    <div className="eachSearchResultTop">
                      <p><strong>{result[0]}</strong></p>
                    </div>
                    <div className="eachSearchResultBottom">
                      <p className="eachSearchedUserName">{result[2]}</p>
                      <p className="eachSearchedFollowers">{result[1]} Followers</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p><strong>{searchQuery}</strong> is currently not available on this platform</p>
          )
        ) : (
          <p>No search results yet.</p>
        )}
      </div>
    </div>
  );
};