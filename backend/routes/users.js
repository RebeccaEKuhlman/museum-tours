const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const e = require('express');
router.use(bodyParser.json());

router.post('/registration', async(request, response, next) => {
    try{
        console.log('Initiating POST /registration request');
        console.log('Request has a body / payload containing:', request.body);
        console.log('Request has params containing:', request.query);

        const payload = request.body; // This payload should be an object containing user data
        console.log(payload);
        const rawPass = payload.password;
        const salt = await bcrypt.genSalt(10);
        const username = payload.username;
        const email = payload.email;
        const hashed = await bcrypt.hash(rawPass, salt);
        const joinDate = new Date();
        const is_director = payload.director;

        const query = request.models.user.addUser(username, hashed, email, joinDate, 25, is_director);
        const results = await query;

        console.log('Results of my POST statement:', results);

        const auth = await request.models.user.authenticateUser(username, rawPass);
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
        const email = request.body.email;
        const rawPass = request.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(rawPass, salt);

        const results = await request.models.user.updateUserPassword(email, hashed);
        if(results){
            console.log('Results of my PUT statement: ', results);
            const check = await request.models.user.fetchUsersByEmail(email);
            response.status(200).json({email: email});
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

        if (newUni) await request.models.user.updateUserUni(email, newUni);
        await request.models.user.updateUserPhoto(email, newPhoto);
        await request.models.user.updateUserBio(email, newBio);
        if(email){
            const results = await request.models.user.fetchUsersByEmail(email);
            console.log('Results of my PUT statement: ', results);
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

        const email = request.query.email;
        const query = request.models.user.deleteUser(email);
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
        } else if (request.query.username) {
            const results = await request.models.user.fetchUsersByName(request.query.username);
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