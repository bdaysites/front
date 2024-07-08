import React, { useState } from 'react';
import axios from 'axios';

interface SearchPaneProps {
  isUploaded: boolean;
}

const SearchPane: React.FC<SearchPaneProps> = ({ isUploaded }) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    axios.post('http://127.0.0.1:5000/search', { query })
      .then(response => {
        // Assuming the response contains an array of search results
        setSearchResults(response.data.results);
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  };

  const handleBacklink = (index: number) => {
    alert(`Backlink for result ${index + 1}`);
  };

  return (
    <div className="pane search-pane">
      <div className="results-box">
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} style={{ width: `${Math.min(80 + result.length * 2, 100)}%` }}>
              <button className="backlink-button" onClick={() => handleBacklink(index)}>Go to</button>
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="search-box">
        {isUploaded ? (
          <>
            <input 
              type="text" 
              placeholder="Search..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </>
        ) : (
          <span>Document upload in progress...</span>
        )}
      </div>
    </div>
  );
};

export default SearchPane;
