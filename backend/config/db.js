const Sequelize = require('sequelize');

const sequelize = new Sequelize('brewery_review_system', 'neelu', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
