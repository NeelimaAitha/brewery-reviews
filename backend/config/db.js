const Sequelize = require('sequelize');

const sequelize = new Sequelize('brewery_review_systems', 'neelu', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
