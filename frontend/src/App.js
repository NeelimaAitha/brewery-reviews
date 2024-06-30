import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Brewery from './components/Brewery';

const App = () => {
    const [token, setToken] = useState('');
    const [breweries, setBreweries] = useState([]);
    const [selectedBrewery, setSelectedBrewery] = useState(null);
    const [loading, setLoading] = useState(false); // New state for loading indicator
    const [error, setError] = useState(null); // New state for error handling

    useEffect(() => {
        const fetchBreweries = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('https://api.openbrewerydb.org/breweries'); // Example API endpoint
                setBreweries(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBreweries();
    }, []);

    return (
        <div>
            {!token ? (
                <div>
                    <Login setToken={setToken} />
                    <Signup setToken={setToken} />
                </div>
            ) : (
                <div>
                    <Search setBreweries={setBreweries} />
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <ul>
                            {breweries.map(brewery => (
                                <li key={brewery.id} onClick={() => setSelectedBrewery(brewery.id)}>
                                    {brewery.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedBrewery && <Brewery breweryId={selectedBrewery} />}
                </div>
            )}
        </div>
    );
};

export default App;
