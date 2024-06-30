import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Brewery from './components/Brewery';

const App = () => {
    const [token, setToken] = useState('');
    const [breweries, setBreweries] = useState([]);
    const [selectedBrewery, setSelectedBrewery] = useState(null);

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
                    <ul>
                        {breweries.map(brewery => (
                            <li key={brewery.id} onClick={() => setSelectedBrewery(brewery.id)}>
                                {brewery.name}
                            </li>
                        ))}
                    </ul>
                    {selectedBrewery && <Brewery breweryId={selectedBrewery} />}
                </div>
            )}
        </div>
    );
};

export default App;
