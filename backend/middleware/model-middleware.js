const Users = require('../models/users');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      users: Users
  }
  next();
}
module.exports = {
  createModelsMiddleware
}