const User = require('../models/users');
const Tour = require('../models/tours');
const Photo = require('../models/photos');
const Booking = require('../models/bookings');
const Rating = require('../models/rating');
const Comment = require('../models/comment');

const createModelsMiddleware = async (req, res, next) => {
  req.models = {
    user: User,
    tour: Tour,
    photo: Photo,
    booking: Booking,
    rating: Rating,
    comment: Comment
  }
  next();
}
module.exports = {
  createModelsMiddleware
}