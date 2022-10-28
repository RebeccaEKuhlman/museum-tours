const pool = require('../db')
const knex = require('../database/knex.js')
module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // GET /login
  app.get('/login', (req, res) => {
    var username = req.param("username");
    const { createHash } = require('crypto');
    function hash(string) {
      return createHash('sha256').update(string).digest('hex');
    }
    var password = hash(req.param("password") + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
    // get connection from pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if error connecting
        logger.error('Problem obtaining MySQL connection', err);
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // no issue connecting
        // password hashing
        // hash and check
        console.log("username", username);
        const { createHash } = require('crypto');
        function hash(string) {
            return createHash('sha256').update(string).digest('hex');
        }
        //salt: aB6nkeF0He3imq4AOhbO5kEljbveRpLn
        const hashed = hash(password + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
        console.log("hashed", hashed);
        connection.query("SELECT username, password FROM users u WHERE username = ? AND password = ?;", [username, hashed], function (err, rows, fields) {
          console.log(rows);
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            if (rows.length == 0) {
              // user does not exist
              console.log("User does not exist");
              res.status(200).json({
                "error": "Invalid Credentials"
              });
            } else if (rows.length == 1) {
              // user does exist
              console.log("User does exist");
              res.status(200).json({
                "data": {
                  "username": rows[0]["username"]
                }
              });
            }
          }
        });
      }
    });
  });



  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });
  
  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
}
