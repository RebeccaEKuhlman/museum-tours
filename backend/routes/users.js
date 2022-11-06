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
const bcrypt = require('bcrypt');
const { rejects } = require('assert');
module.exports = function users(app, logger) {
    app.post('/users/registration', async (request, response) => {
        try {
            console.log('Initiating POST /registration request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);
    
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
    app.post('/users/login', async (request, response) => {
        try {
            console.log('Initiating POST /login request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);
    
            const payload = request.body; // This payload should be an object containing user data
            const rawPass = request.body.password;

            const { createHash } = require('crypto');
            function hash(string) {
                return createHash('sha256').update(string).digest('hex');
            }
            const email = request.body.email;
            //salt: aB6nkeF0He3imq4AOhbO5kEljbveRpLn
            const hashed = hash(rawPass + 'aB6nkeF0He3imq4AOhbO5kEljbveRpLn');
            const results = await knex('users').where({email: email}).where({password: hashed});

            if (typeof results[0] != "undefined") {
                // if user exists
                const JTW = jwt.makeJWT(result.insertId)
                response.status(200).json(results);
                res.status(201).cookie("session", JWT, {httpOnly: true, path: "/", maxAge: 500, sameSite: "lax", secure: process.env})
                .send({
                    message: "User created",
                    success: true, 
                    username, 
                    id: result.insertId
                }) 
                
                
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
    app.put('/users/updateBio', async (request, response) => {
        try {
            const username = request.body.username
            const newBio = request.body.bio
            const query = knex('users')
                .where({ username: username })
                .update({ bio: newBio })
        const results = await query;
        console.log('Results of my PUT statement: ', results);
        response.status(200).json({ username: username, bio: newBio});
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
    app.get('/users', async (request, response) => {
        try {
            const bodyParser = require('body-parser');
            app.use(bodyParser.json());

            if(request.body.username){
                const results = await knex('users').select().where( {'username':request.body.username} );
                response.status(200).json(results);
            }
            else if(request.body.uni_affilation){
                const results = await knex('users').select().where( {'uni_affilation':request.body.uni_affilation} );
                response.status(200).json(results);
            }
            else if(request.body.is_director){
                const results = await knex('users').select().where( {'is_director':request.body.is_director} );
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