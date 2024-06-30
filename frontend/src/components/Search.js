// Search.js
import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [byCity, setByCity] = useState('');
  const [byName, setByName] = useState('');
  const [byType, setByType] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3009/api/search`, {
        params: {
          by_city: byCity,
          by_name: byName,
          by_type: byType,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={byCity}
          onChange={(e) => setByCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={byName}
          onChange={(e) => setByName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={byType}
          onChange={(e) => setByType(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map((brewery) => (
          <div key={brewery.id}>
            <h3>{brewery.name}</h3>
            <p>{brewery.city}, {brewery.state}</p>
            <p>{brewery.phone}</p>
            <a href={brewery.website_url}>{brewery.website_url}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
