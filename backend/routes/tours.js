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

const knex = require('../database/knex.js');
const express = require('express');
const pool = require('../db');

module.exports = function tours(app, logger) {

    //fetchToursByName, fetchToursByMuseum_name, and fetchAllTours
    //not in models\tours: fetchTourByPrice
    app.get('/tours', async (request, response) => {
        try {

            console.log('Initiating GET /tours request');
            console.log('Request has params containing:', request.query);
            if(request.query.tour_Name){
                const results = await knex('tours').select().where( {'tour_Name':request.query.tour_Name} );
                response.status(201).json(results);
            }
            else if(request.query.museum_name){
                const results = await knex('tours').select().where( {'museum_name':request.query.museum_name} );
                response.status(201).json(results);
            }
            else if(request.query.price){
                //returns all tours that are at the requested price and below
                const results = await knex('tours').select().whereBetween('price', [0, request.query.price]);
                response.status(201).json(results);
            }
            else{
                const results = await knex("tours").select();
                response.status(201).json(results);
            }
        } catch (err) {
            console.error('There was an error in GET /tours', err);
            response.status(500).json({ message: err.message });
        }
    });
}