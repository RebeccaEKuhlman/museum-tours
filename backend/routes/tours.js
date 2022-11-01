/** TABLE tours:
	tour_Name VARCHAR(30) NOT NULL PRIMARY KEY,
	tourDate Date NOT NULL,
	tourTime Time NOT NULL,
	num_spaces_available int NOT NULL,
	total_space int NOT NULL,
	tour_description VARCHAR(30),
	price int,
	museum_name varchar(30) NOT NULL,
	FOREIGN KEY (museum_name) REFERENCES museums(museum_name),
	theme VARCHAR(30) NOT NULL
**/

const { raw } = require('body-parser');
const knex = require('../database/knex.js');
const express = require('express');

module.exports = function users(app, logger) {

    //fetchToursByName, fetchToursByMuseum_name, and fetchAllTours
    app.get('/tours', async (request, response) => {
        try {
            console.log('Initiating GET /tours request');
            const bodyParser = require('body-parser');
            app.use(bodyParser.json());

            if(request.body.tour_Name){
                const results = await request.models.tour.fetchToursByName(request.body.tour_Name);
                response.status(201).json(results);
            }
            else if(request.query.museum_name){
                const results = await request.models.tour.fetchToursByMuseum_name(request.body.museum_name);
                response.status(201).json(results);
            }
            else{
                const results = await request.models.tour.fetchAllTours();
                response.status(201).json(results);
            }
        } catch (err) {
            console.error('There was an error in GET /tours', err);
            response.status(500).json({ message: err.message });
        }
    });

    /*app.put('/users/updatePassword', async (request, response) => {
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
    });*/
}