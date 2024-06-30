import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // adjust if necessary
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

ReactDOM.render(<App />, document.getElementById('root'));
