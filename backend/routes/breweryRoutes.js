// In routes/breweryRoutes.js

const express = require('express');
const router = express.Router();
const { Brewery, Review } = require('../models'); // Import your models

// Controller method to get all breweries
const getBreweries = async (req, res) => {
    try {
        const breweries = await Brewery.findAll();
        res.json(breweries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller method to get a specific brewery by ID
const getBreweryById = async (req, res) => {
    const { id } = req.params;
    try {
        const brewery = await Brewery.findByPk(id);
        if (!brewery) {
            return res.status(404).json({ message: 'Brewery not found' });
        }
        res.json(brewery);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller method to add a review for a brewery
const addReview = async (req, res) => {
    const { id } = req.params;
    const { rating, description } = req.body;

    try {
        const brewery = await Brewery.findByPk(id);
        if (!brewery) {
            return res.status(404).json({ message: 'Brewery not found' });
        }

        const newReview = await Review.create({
            rating,
            description,
            breweryId: id // Associate the review with the brewery
        });

        res.status(201).json(newReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Define routes
router.get('/breweries', getBreweries); // Route to get all breweries
router.get('/breweries/:id', getBreweryById); // Route to get a specific brewery by ID
router.post('/breweries/:id/reviews', addReview); // Route to add a review for a brewery

module.exports = router;
