const { Review, Brewery, User } = require('../models');

exports.addReview = async (req, res) => {
    try {
        const { rating, description, breweryId } = req.body;
        const userId = req.userId; // assuming you extract userId from JWT middleware
        const review = await Review.create({ rating, description, BreweryId: breweryId, UserId: userId });
        const reviews = await Review.findAll({ where: { BreweryId: breweryId } });
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        await Brewery.update({ rating: averageRating }, { where: { id: breweryId } });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
