const User = require('../models/users');
const Tour = require('../models/tours');
const Booking = require('../models/bookings')
const createModelsMiddleware = async (req, res, next) => {
  req.models = {
    user: User,
    tour: Tour,
    booking: Booking
  }
  next();
}
module.exports = {
  createModelsMiddleware
}