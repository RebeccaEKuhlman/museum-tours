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
// const knex = require('../database/knex.js');
const bcrypt = require('bcryptjs');
// const {fetchUsersByEmail} = require('../models/users');
// const {authenticateUser} = require('../models/users');
// const { query } = require('express');

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/registration', async(request, response, next) => {
    try{
        console.log('Initiating POST /registration request');
        console.log('Request has a body / payload containing:', request.body);
        console.log('Request has params containing:', request.query);

        const payload = request.body; // This payload should be an object containing user data
        const rawPass = payload.password;
        const salt = await bcrypt.genSalt(10);
        const username = payload.username;
        const email = payload.email;
        const hashed = await bcrypt.hash(rawPass, salt);
        const joinDate = new Date();
        const is_director = payload.director;

        const query = request.models.user.addUser(username, hashed, email, joinDate, 1, is_director);
        const results = await query;

        console.log('Results of my POST statement:', results);

        const auth = await request.models.user.authenticateUser({username}, rawPass);
        if(results){
            response.status(201).json({"email": email, "jwt": auth, "is_director": is_director});
            return auth;
        }
        else{
            console.error('There was an error in POST /users');
            response.status(400).json('Make sure all needed data is included');
        }
    } catch (err) {
        console.error('There was an error in POST /users', err);
        response.status(500).json({ message: err.message });
    }
});

router.post('/login', async(request, response, next) => {
    try {
        console.log('Initiating POST /login request');
        console.log('Request has a body / payload containing:', request.body);

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

        const users = await request.models.user.fetchUsersByEmail(email);
        if (users.length === 0) {
            console.error(`No users matched the email: ${email}`);
            throw new Error(`No users matched the email: ${email}`);
        }
        const user = users[0];
        console.log("user", user);
        const auth = await request.models.user.authenticateUser(user.username, password);
//         const validPassword = await bcrypt.compare(password, user.password);
        if (auth !== null) {
            // if user exists
            delete user.password;
            response.status(200).json({"email": email, "jwt": auth, "is_director": user.is_director});
            return auth;
        } else
            response.status(200).json({ "error": "Invalid Credentials" });

        next();
    } catch (err) {
        console.error('There was an error in POST /users/login', err);
        response.status(500).json({ message: err.message });
    }
});

router.put('/updatePassword', async(request, response, next) => {
    try {
        const username = request.body.email;
        const rawPass = request.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(rawPass, salt);

        const results = await request.models.user.updateUserPassword(username, hashed);
        if(results){
            console.log('Results of my PUT statement: ', results);
            const check = await request.models.user.fetchUsersByName(username);
            response.status(200).json({email: username});
        }
        else{
            console.error('There was an error in PUT /users/updatePassword');
            response.status(400).json('There was an error in PUT /users/updatePassword');
        }
    } catch (err) {
        console.error('There was an error in PUT /users/updatePassword', err);
        response.status(500).json({ message: err.message });
    }
});

router.put('/updateInfo', async(request, response, next) => {
    try {
        const email = request.body.email;
        const newPhoto = request.body.photo;
        const newUni = request.body.uni;
        const newBio = request.body.bio;

        const uniResults = await request.models.user.updateUserUni(email, newUni);
        const photoResults = await request.models.user.updateUserPhoto(email, newPhoto);
        const bioResults = await request.models.user.updateUserBio(email, newBio);
        if(email){
            console.log('Results of my PUT statement: ', results);
            const results = await request.models.user.fetchUsersByEmail(email);
            response.status(200).json(results);
        }
        else{
            console.error('There was an error in PUT /users/updateInfo');
            response.status(400).json('There was an error in PUT /users/updateInfo');
        }
    } catch (err) {
        console.error('There was an error in PUT /users/updateInfo', err);
        response.status(500).json({ message: err.message });
    }
});

router.delete('/', async(request, response, next) => {
    try {
        console.log('Initiating DELETE /users request');
        console.log('Request has params containing:', request.query);

        const username = request.query.username;
        const query = request.models.user.deleteUser(username);
        const results = await query;

        console.log('Results of my DELETE statement:', results);
        response.status(200).json();
        next();
    } catch (err) {
        console.error('There was an error in DELETE /users', err);
        response.status(500).json({ message: err.message });
    }
});

router.get('/', async(request, response, next) => {
    try {
        console.log('Initiating GET /users request');
        console.log('Request has params containing:', request.query);
        console.log("email", request.query.email);

        if (request.query.email) {
            const results = await request.models.user.fetchUsersByEmail(request.query.email);
            response.status(200).json(results);
            console.log("results", results);
        } else if (payload.username) {
            const results = await request.models.user.fetchUsersByName(payload.username);
            response.status(200).json(results);
        } else {
            // get all users
            const results = await request.models.user.fetchAllUsers();
            response.status(200).json(results);
        }
    } catch (err) {
        console.error('There was an error in GET /users', err);
        response.status(500).json({ message: err.message });
    }
});

module.exports = router;

// module.exports = function users(app, logger) {
//     app.post('/users/registration', async (request, response) => {
//         try {
//             console.log('Initiating POST /registration request');
//             console.log('Request has a body / payload containing:', request.body);
//             console.log('Request has params containing:', request.query);
//             const payload = request.body; // This payload should be an object containing user data
//             const rawPass = request.body.password;
//             const salt = await bcrypt.genSalt(10);
//             const username = payload.username;
//             const email = payload.email;
//             const hashed = await bcrypt.hash(rawPass, salt);;
//             const joinDate = new Date();
//             const query = knex('users').insert({ username, password: hashed, email, joinDate, photoId: 1})
//             const results = await query;
//             console.log('Results of my POST statement:', results);
//             response.status(201).json({"is_director" : user.is_director});
//             const auth = await authenticateUser({username}, rawPass);
//             return auth;
//         } catch (err) {
//             console.error('There was an error in POST /users', err);
//             response.status(500).json({ message: err.message });
//         }
//     });
//     app.post('/users/login', async (request, response) => {
//         try {
//             console.log('Initiating POST /login request');
//             console.log('Request has a body / payload containing:', request.body);
//             console.log('Request has params containing:', request.query);
//             const email = request.body.email;
//             const password = request.body.password;
//             /**const urlParams = new URLSearchParams(request.url);
//             console.log('Request has params containing:', urlParams.keys());
//             const email = urlParams.keys().value;
//             const password = urlParams.get(email);
//             console.log('Request has params containing:', email);
//             console.log('Request has params containing:', password);
//
//              * const email = request.body.email;
//                 const password = request.body.password;
//              */
//             const users = await fetchUsersByEmail(email);
//             if (users.length === 0) {
//                 console.error(`No users matched the email: ${email}`);
//                 throw new Error(`No users matched the email: ${email}`);
//             }
//             const user = users[0];
//             console.log("user", user);
//             const auth = await authenticateUser(user, password);
//          //   const validPassword = await bcrypt.compare(password, user.password);
//             if (auth !== null) {
//                 // if user exists
//                 delete user.password;
//                 response.status(200).json({"jwt": auth, "is_director" : user.is_director});
//                 return auth;
//             } else {
//                 response.status(200).json({
//                     "error": "Invalid Credentials"
//                   });
//             }
//             response.status(200).json();
//         } catch (err) {
//             console.error('There was an error in POST /users/login', err);
//             response.status(500).json({ message: err.message });
//         }
//     });
//     app.put('/users/updatePassword', async (request, response) => {
//         try {
//             const username = request.body.username
//             const rawPass = request.body.password;
//             const salt = await bcrypt.genSalt(10);
//             const hashed = await bcrypt.hash(rawPass, salt);;
//             const query = knex('users')
//                 .where({ username: username })
//                 .update({ password: hashed })
//             const results = await query;
//             console.log('Results of my PUT statement: ', results);
//             response.status(200).json({ username: username});
//         } catch (err) {
//             console.error('There was an error in PUT /users/updatePassword', err);
//             response.status(500).json({ message: err.message });
//         }
//     })
//     app.put('/users/updateBio', async (request, response) => {
//         try {
//             const username = request.body.username
//             const newBio = request.body.bio
//             const query = knex('users')
//                 .where({ username: username })
//                 .update({ bio: newBio })
//         const results = await query;
//         console.log('Results of my PUT statement: ', results);
//         response.status(200).json({ username: username, bio: newBio});
//         } catch (err) {
//             console.error('There was an error in PUT /users/updateBio', err);
//             response.status(500).json({ message: err.message });
//         }
//     })
//     app.delete('/users', async (request, response) => {
//         try {
//             console.log('Initiating DELETE /users request');
//             console.log('Request has a body / payload containing:', request.body);
//             console.log('Request has params containing:', request.query);
//             const username = request.body.username
//             const query = knex('users').delete().where({username});
//             const results = await query;
//             console.log('Results of my DELETE statement:', results);
//             response.status(200).json(results);
//         } catch (err) {
//             console.error('There was an error in DELETE /users', err);
//             response.status(500).json({ message: err.message });
//         }
//     });
//     app.get('/users', async (request, response) => {
//         try {
//             const bodyParser = require('body-parser');
//             app.use(bodyParser.json());
//
//             if(request.body.username){
//                 const results = await knex('users').select().where( {'username':request.body.username} );
//                 response.status(200).json(results);
//             }
//             else if(request.body.uni_affilation){
//                 const results = await knex('users').select().where( {'uni_affilation':request.body.uni_affilation} );
//                 response.status(200).json(results);
//             }
//             else if(request.body.is_director){
//                 const results = await knex('users').select().where( {'is_director':request.body.is_director} );
//                 response.status(200).json(results);
//             }
//             else{
//                 const results = await knex("users").select();
//                 response.status(200).json(results);
//             }
//         } catch (err) {
//             console.error('There was an error in GET /users', err);
//             response.status(500).json({ message: err.message });
//         }
//     });
// }