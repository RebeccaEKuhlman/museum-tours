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
const knex = require('../database/knex.js');
const bcrypt = require('bcrypt');
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
    app.put('/users/updatePassword', async (request, response) => {
        try {
            const username = request.body.username
            const newPass = request.body.password
            const { createHash } = require('crypto');
        function hash(string) {
            return createHash('sha256').update(string).digest('hex');
        }
        const hashed = hash(newPass + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
        const query = knex('users')
            .where({ username: username })
            .update({ password: hashed })
        const results = await query;
        console.log('Results of my PUT statement: ', results);
        response.status(200).json({ username: username});
        } catch (err) {
            console.error('There was an error in PUT /users/updatePassword', err);
            response.status(500).json({ message: err.message });
        }
    })
    app.delete('/users', async (request, response) => {
        try {
            console.log('Initiating DELETE /users request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);
            const username = request.body.username
            const query = knex('users').delete().where({username});
            const results = await query;
            console.log('Results of my DELETE statement:', results);
            response.status(200).json(results);
        } catch (err) {
            console.error('There was an error in DELETE /users', err);
            response.status(500).json({ message: err.message });
        }
    });
}