import React, { useState, useEffect } from "react";
import "./App.css";

const SearchPage = () => {
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
                <div className="eachSearchResult" key={index}>
                  <img src="https://images.unsplash.com/photo-1687042277586-971369d3d241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
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
            <p><strong>{searchQuery}</strong> is currently not on this platform</p>
          )
        ) : (
          <p>No search results yet.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
