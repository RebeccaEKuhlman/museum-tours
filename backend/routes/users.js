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
const knex = require('../database/knex.js');
const bcrypt = require('bcryptjs');
const {fetchUsersByEmail} = require('../models/users');
const {authenticateUser} = require('../models/users');
const { query } = require('express');

module.exports = function users(app, logger) {
    app.post('/users/registration', async (request, response) => {
        try {
            console.log('Initiating POST /registration request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);

            const payload = request.body; // This payload should be an object containing user data
            const rawPass = payload.password;
            const salt = await bcrypt.genSalt(10);
            const username = payload.username;
            const email = payload.email;
            const hashed = await bcrypt.hash(rawPass, salt);;
            const joinDate = new Date();
            const is_director = payload.director;

            const query = knex('users').insert({ username, password: hashed, email, joinDate, photoId: 1, is_director})
            const results = await query;
            console.log('Results of my POST statement:', results);
            const auth = await authenticateUser({username}, rawPass); 
            response.status(200).json({"email": email, "jwt": auth, "is_director": is_director});
            return auth; 
        } catch (err) {
            console.error('There was an error in POST /users', err);
            response.status(500).json({ message: err.message });
        }
    });
    app.post('/users/login', async (request, response) => {
        try {
            console.log('Initiating POST /login request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);
            const email = request.body.email;
            const password = request.body.password;
            /**const urlParams = new URLSearchParams(request.url);
            console.log('Request has params containing:', urlParams.keys());
            const email = urlParams.keys().value;
            const password = urlParams.get(email);
            console.log('Request has params containing:', email);
            console.log('Request has params containing:', password);
            
             * const email = request.body.email;
                const password = request.body.password;
             */
            const users = await fetchUsersByEmail(email);
            if (users.length === 0) {
                console.error(`No users matched the email: ${email}`);
                throw new Error(`No users matched the email: ${email}`);
            }
            const user = users[0];
            console.log("user", user);
            const auth = await authenticateUser(user, password); 
         //   const validPassword = await bcrypt.compare(password, user.password);
            if (auth !== null) {
                // if user exists
                delete user.password;
                response.status(200).json({"email": email, "jwt": auth, "is_director" : user.is_director});
                return auth;
            } else {
                response.status(200).json({
                    "error": "Invalid Credentials"
                  });
            }
            response.status(200).json();
        } catch (err) {
            console.error('There was an error in POST /users/login', err);
            response.status(500).json({ message: err.message });
        }
    });
    app.put('/users/updatePassword', async (request, response) => {
        try {
            const username = request.body.email
            const rawPass = request.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(rawPass, salt);;
            const query = knex('users')
                .where({ username: username })
                .update({ password: hashed })
            const results = await query;
            console.log('Results of my PUT statement: ', results);
            response.status(200).json({ email: email });
        } catch (err) {
            console.error('There was an error in PUT /users/updatePassword', err);
            response.status(500).json({ message: err.message });
        }
    })
    app.put('/users/updateInfo', async (request, response) => {
        try {
            const payload = request.body;
            const email = payload.email;
            const newPhoto = payload.photo;
            const newUni = payload.uni;
            const newBio = payload.bio
            const query = await knex('users')
                .where({email})
                .update({ photoId: newPhoto, uni_affilation: newUni, bio: newBio });
            const results = await knex('users').select().where({email});
            response.status(200).json(results);
        } catch (err) {
            console.error('There was an error in PUT /users/updateBio', err);
            response.status(500).json({ message: err.message });
        }
    })
    app.delete('/users', async (request, response) => {
        try {
            console.log('Initiating DELETE /users request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);
            const email = request.query.email;
            const query = knex('users').delete().where({email});
            const results = await query;
            console.log('Results of my DELETE statement:', results);
            response.status(200).json(results);
        } catch (err) {
            console.error('There was an error in DELETE /users', err);
            response.status(500).json({ message: err.message });
        }
    });
    app.get('/users', async (request, response) => {
        try {
            const bodyParser = require('body-parser');
            app.use(bodyParser.json());
            
            if(request.query.email){
                const results = await knex('users').select().where( {'email': request.query.email} );
                response.status(200).json(results);
            }
            else if(request.query.uni_affilation){
                const results = await knex('users').select().where( {'uni_affilation':request.query.uni_affilation} );
                response.status(200).json(results);
            }
            else if(request.query.is_director){
                const results = await knex('users').select().where( {'is_director':request.query.is_director} );
                response.status(200).json(results);
            }
            else{
                const results = await knex("users").select();
                response.status(200).json(results);
            }
        } catch (err) {
            console.error('There was an error in GET /users', err);
            response.status(500).json({ message: err.message });
        }
    });
}