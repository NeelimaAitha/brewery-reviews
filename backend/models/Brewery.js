// In models/brewery.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust based on your Sequelize setup

const Brewery = sequelize.define('Brewery', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    website_url: {
        type: DataTypes.STRING // Ensure website_url is defined if it exists in your database schema
    },
    rating: {
        type: DataTypes.FLOAT
    },
    state: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    }
});

module.exports = Brewery;
