const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Brewery = sequelize.define('Brewery', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    website_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Review = sequelize.define('Review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

User.hasMany(Review, { foreignKey: 'userId' });
Brewery.hasMany(Review, { foreignKey: 'breweryId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Brewery, { foreignKey: 'breweryId' });

module.exports = {
    User,
    Brewery,
    Review,
    sequelize
};
