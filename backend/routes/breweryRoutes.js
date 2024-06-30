const express = require('express');
const router = express.Router();
const { Brewery } = require('../models');

// GET /api/breweries
router.get('/api/breweries', async (req, res) => {
  const { by_city, by_name, by_type } = req.query;
  try {
    let whereClause = {};
    if (by_city) {
      whereClause.city = by_city;
    }
    if (by_name) {
      whereClause.name = by_name;
    }
    if (by_type) {
      whereClause.type = by_type;
    }

    const breweries = await Brewery.findAll({
      where: whereClause,
      attributes: ['id', 'name', 'address', 'phone', 'website_url', 'rating', 'state', 'city', 'createdAt', 'updatedAt']
    });

    res.json(breweries);
  } catch (error) {
    console.error('Error fetching breweries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
