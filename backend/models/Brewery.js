const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
        type: DataTypes.STRING,
    },
    website_url: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
});

module.exports = Brewery;

