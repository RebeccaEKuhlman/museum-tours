const connectToDatabase = require('../models/database-helpers');
const User = require('../models/users');
const createModelsMiddleware = async (req, res, next) => {
   console.log('Connecting to the database');
   const { DBQuery, disconnect } = await connectToDatabase();
   req.models = {
       user: new User(DBQuery, disconnect),
   }
   req.disconnect = disconnect;
   next();
}
const disconnectFromDatababaseMiddleware = (req, res, next) => {
   console.log('Disconnecting from the database');
   req.disconnect();
   next();
}
module.exports = {
   createModelsMiddleware,
   disconnectFromDatababaseMiddleware
}