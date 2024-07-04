import React, { useState } from 'react';

const SearchPane: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    // This is just a dummy search function.
    // In a real application, you would perform the actual search here.
    const results = Array(5).fill(`Search result for "${query}"`).map((result, index) => result + ' '.repeat(index * 20)); // Add varying lengths
    setSearchResults(results);
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
        <input 
          type="text" 
          placeholder="Search..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchPane;
