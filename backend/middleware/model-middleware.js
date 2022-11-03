const User = require('../models/users');
const Tour = require('../models/tours');
const Photo = require('../models/photos');
const createModelsMiddleware = async (req, res, next) => {
  req.models = {
    user: User,
    tour: Tour,
    photo: Photo
  }
  next();
}
module.exports = {
  createModelsMiddleware
}