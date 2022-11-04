const User = require('../models/users');
const Tour = require('../models/tours');
const Photo = require('../models/photos');
const Booking = require('../models/bookings')

const createModelsMiddleware = async (req, res, next) => {
  req.models = {
    user: User,
    tour: Tour,
    photo: Photo,
    booking: Booking
  }
  next();
}
module.exports = {
  createModelsMiddleware
}