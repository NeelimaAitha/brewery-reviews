import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddReview from './AddReview';

const Brewery = ({ breweryId }) => {
    const [brewery, setBrewery] = useState(null);

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const response = await axios.get(`http://localhost:3009/api/breweries/${breweryId}`);
                setBrewery(response.data);
            } catch (error) {
                console.error('Fetch Brewery error:', error);
            }
        };
        fetchBrewery();
    }, [breweryId]);

    return brewery ? (
        <div>
            <h2>{brewery.name}</h2>
            <p>{brewery.address}</p>
            <p>{brewery.phone}</p>
            <p><a href={brewery.website_url}>{brewery.website_url}</a></p>
            <p>Rating: {brewery.rating}</p>
            <h3>Reviews</h3>
            <ul>
                {brewery.Reviews.map(review => (
                    <li key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.description}</p>
                    </li>
                ))}
            </ul>
            <AddReview breweryId={breweryId} />
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default Brewery;
