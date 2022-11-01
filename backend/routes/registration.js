/**
    username VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    joinDate DATE NOT NULL,
    photoId INT NOT NULL,
    uni_affilation VARCHAR(50),
    is_director BOOL DEFAULT False,
    bio VARCHAR(100),
    FOREIGN KEY (photoId) REFERENCES photos(photoId)
    * */    

    const knex = require('../database/knex.js')
    module.exports = function registration(app, logger) {
        app.post('/registration', async (request, response) => {
            try {
                console.log('Initiating POST /registration request');
                console.log('Request has a body / payload containing:', request.body);
                console.log('Request has params containing:', request.query);
                const payload = request.body; // This payload should be an object containing user data
                
                //Hashing Password
                const rawPass = payload.password;
                const { createHash } = require('crypto');
                function hash(string) {
                    return createHash('sha256').update(string).digest('hex');
                }
                //salt: aB6nkeF0He3imq4AOhbO5kEljbveRpLn
                const hashed = hash(rawPass + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
    
                //need to set seperate vars
                const username = payload.username;
                const email = payload.email;
                const joinDate = new Date();
                //Knex
                const query = knex('users').insert({ username, password: hashed, email, joinDate, photoId: 1})
                const results = await query;
                console.log('Results of my POST statement:', results);
                response.status(201).json(results);
            } catch (err) {
                console.error('There was an error in POST /users', err);
                response.status(500).json({ message: err.message });
            }
        });
    }