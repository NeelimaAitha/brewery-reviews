import React, { useState } from 'react';
import axios from 'axios';

const AddReview = ({ breweryId }) => {
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/reviews', { rating, description, breweryId });
        } catch (error) {
            console.error('Add Review error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Review</h3>
            <div>
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit">Add Review</button>
        </form>
    );
};

export default AddReview;
