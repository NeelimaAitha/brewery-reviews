const express = require('express');
const { addReview } = require('../controllers/reviewController');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // create a middleware to authenticate

router.post('/reviews', authenticate, addReview);

module.exports = router;
