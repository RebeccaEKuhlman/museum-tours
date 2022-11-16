const User = require('../models/users');
const Tour = require('../models/tours');
const Photo = require('../models/photos');
const Booking = require('../models/bookings')
const Museum = require('../models/museums');

const createModelsMiddleware = async (req, res, next) => {
  req.models = {
    user: User,
    tour: Tour,
    photo: Photo,
    booking: Booking,
    museum: Museum
  }
  next();
}
module.exports = {
  createModelsMiddleware
}