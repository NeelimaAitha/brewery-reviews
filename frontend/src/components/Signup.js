import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signup', { username, password });
            setToken(response.data.token);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
