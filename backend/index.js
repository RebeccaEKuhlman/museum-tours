require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/users' );
const { createModelsMiddleware  } = require('./middleware/model-middleware' );
const app = express();
const port = 8000;
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const routes = require('./routes/routes');

// set up some configs for express.
const config = {
   name: 'sample-express-app',
   port: 8000,
   host: '0.0.0.0',
 };

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });
app.use(cors({
   origin: '*'
 }));

app.use(createModelsMiddleware );
app.get('/health', (request, response, next) => {
   const responseBody = { status: 'up', port };
   response.json(responseBody);
   // next() is how we tell express to continue through the middleware chain
   next();
});

routes(app, logger);
app.use('/users', UserRoutes);

app.listen(port, () => {
    console.log(`This app is listening on port  ${port}`);
 });