const User = require('../models/users');
const Tour = require('../models/tours');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      user: User,
      tour: Tour
  }
  next();
}
module.exports = {
  createModelsMiddleware
}