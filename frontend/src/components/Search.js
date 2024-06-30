import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ setBreweries }) => {
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/breweries', {
                params: { by_city: city, by_name: name, by_type: type }
            });
            setBreweries(response.data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Search Breweries</h2>
            <div>
                <label>City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Type</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
