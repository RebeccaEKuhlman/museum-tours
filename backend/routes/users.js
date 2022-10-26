        /**
       * username VARCHAR(30) NOT NULL PRIMARY KEY,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        joinDate DATE NOT NULL,
        photoId INT NOT NULL,
        uni_affilation VARCHAR(50),
        is_director BOOL DEFAULT False,
        bio VARCHAR(100),
        FOREIGN KEY (photoId) REFERENCES photos(photoId)
       * 
       */
const { raw } = require('body-parser');
const knex = require('../database/knex.js')
module.exports = function users(app, logger) {
    app.post('/users/registration', async (request, response) => {
        try {
            console.log('Initiating POST /registration request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);
        
            const bodyParser = require('body-parser');
            app.use(bodyParser.json());
            const payload = request.body; // This payload should be an object containing user data
            const rawPass = request.query.password;
        // table.string('password_hash');
            const { createHash } = require('crypto');
            function hash(string) {
                return createHash('sha256').update(string).digest('hex');
            }
            const username = payload.username;
            const email = payload.email;
            //salt: aB6nkeF0He3imq4AOhbO5kEljbveRpLn
            const hashed = hash(rawPass + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
            // const { DBQuery, disconnect } = await connectToDatabase();
            const joinDate = new Date();
            // const results = await DBQuery('INSERT INTO users(name) VALUES(username, hashed, email, date)'
            // , [payload.name]);
            const query = knex('users').insert({ username, password: hashed, email, joinDate, photoId: 1})
            const results = await query;
            console.log('Results of my POST statement:', results);
                


        
            // Since we already know the id we're looking for, let's load the most up to date data
            // const newlyCreatedRecord = await DBQuery('SELECT * FROM student WHERE id = ?', [id]);
            // disconnect();
            response.status(201).json(results);
        } catch (err) {
            console.error('There was an error in POST /users', err);
            response.status(500).json({ message: err.message });
        }
    });
    // login
    app.get('/users/login', async (request, response) => {
        try {
            console.log('Login Attempt');
            const bodyParser = require('body-parser');
            app.use(bodyParser.json());
            // payload is object containing user data
            // console.log(request);
            // const username = 'user90';
            // const rawPass = 'passpass';
            const username = request.body.username
            const rawPass = request.body.password
            console.log(rawPass);

            // hash and check
            const { createHash } = require('crypto');
            function hash(string) {
                return createHash('sha256').update(string).digest('hex');
            }
            //salt: aB6nkeF0He3imq4AOhbO5kEljbveRpLn
            const hashed = hash(rawPass + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
            // query database
            console.log(username);
            console.log(hashed);
            const query = knex('users').where({username}).where({password: hashed});
            const results = await query;
            console.log('Results of my GET statement: ', results);

            // response
            response.status(200).json({ username: username});
        } catch (err) {
            console.error('There was an error in GET /users', err);
            response.status(500).json({ message: err.message });
        }
    })
}