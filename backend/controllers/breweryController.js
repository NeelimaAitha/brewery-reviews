const axios = require('axios');
const { Brewery } = require('../models');

exports.searchBreweries = async (req, res) => {
    try {
        const { by_city, by_name, by_type } = req.query;
        const response = await axios.get('https://api.openbrewerydb.org/breweries', {
            params: { by_city, by_name, by_type }
        });
        const breweries = response.data.map(brewery => ({
            name: brewery.name,
            address: brewery.street,
            phone: brewery.phone,
            website_url: brewery.website_url,
            state: brewery.state,
            city: brewery.city,
        }));
        await Brewery.bulkCreate(breweries, { ignoreDuplicates: true });
        res.status(200).json(breweries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBrewery = async (req, res) => {
    try {
        const { id } = req.params;
        const brewery = await Brewery.findByPk(id, { include: 'Reviews' });
        if (!brewery) {
            return res.status(404).json({ error: 'Brewery not found' });
        }
        res.status(200).json(brewery);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
