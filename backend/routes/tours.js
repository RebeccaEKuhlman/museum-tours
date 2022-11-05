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

const { tourTable } = require('../models/tours');
const knex = require('../database/knex.js');
const express = require('express');

module.exports = function tours(app, logger) {

    /* GET tours: allTours, byName, byMuseum_name, byPrice, byDay, byMonth, byYear, byWeek, byDate, byTheme */
    app.get('/tours', async (request, response) => {
        try {

            console.log('Initiating GET /tours request');
            console.log('Request has params containing:', request.query);

            if(request.query.tour_Name){
                //query params: tour_Name = 'example string'
                const results = await knex('tours').select().where( {'tour_Name':request.query.tour_Name} );
                response.status(201).json(results);
            }
            else if(request.query.museum_name){
                //returns all tours scheduled at the requested museum
                //query params: museum_name = 'example string'
                const results = await knex('tours').select().where( {'museum_name':request.query.museum_name} );
                response.status(201).json(results);
            }
            else if(request.query.price){
                //returns all tours that are at the requested price and below
                //query params: price = integer
                const results = await knex('tours').select().whereBetween('price', [0, request.query.price]);
                response.status(201).json(results);
            }
            else if(request.query.month && request.query.day){
                //returns all tours scheduled at the requested day (needs a month to specify which day)
                //query params: month = # between 1-12, day = # between 1-31
                const results = await knex('tours').select().andWhereRaw('MONTH(tourDate) = ? AND DAY(tourDate) = ?',
                                                                         [request.query.month, request.query.day]);
                response.status(201).json(results);
            }
            else if(request.query.month){
                //returns all tours scheduled at the requested month
                //query params: month = # between 1-12
                const results = await knex('tours').select().andWhereRaw('MONTH(tourDate) = ?', request.query.month);
                response.status(201).json(results);
            }
            else if(request.query.year){
                //returns all tours scheduled at the requested year
                //query params: year = #
                const results = await knex('tours').select().andWhereRaw('YEAR(tourDate) = ?', request.query.year);
                response.status(201).json(results);
            }
            else if(request.query.startDate && request.query.endDate){
                //returns all tours scheduled in between startDate and endDate
                //query params: startDate = 'YYYY-MM-DD', endDate = 'YYYY-MM-DD'
                //note: make sure that the order of dates is correct
                const results = await knex('tours').select().whereBetween('tourDate', [request.query.startDate,
                                                                                       request.query.endDate]);
                response.status(201).json(results);
            }
            else if(request.query.theme){
                //returns all tours that belong to the requested theme
                //query params: theme = 'example string'
                const results = await knex('tours').select().where( {'theme':request.query.theme} );
                response.status(201).json(results);
            }
            else if(request.query.date){
                //returns all tours scheduled at the requested date
                //query params: date = 'YYYY-MM-DD'
                const results = await knex('tours').select().where( {'tourDate':request.query.date} );
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

    //POST: addTour
    app.post('/tours/addNewTour', async (request, response) => {
        try {
            console.log('Initiating POST /addNewTour request');
            console.log('Request has a body containing:', request.body);

            const tour_Name = request.body.tour_Name;
            const tourDate = new Date(request.body.tourDate);
            const tourTime = request.body.tourTime;
            const num_spaces_available = request.body.spaces_available;
            const total_space = request.body.total_space;
            const tour_description = request.body.description;
            const price = request.body.price;
            const museum_name = request.body.museum_name;
            const theme = request.body.theme;

            const query = knex('tours').insert({tour_Name, tourDate, tourTime, num_spaces_available, total_space,
                                                tour_description, price, museum_name, theme});
            const results = await query;
            response.status(200).json(results);
        } catch (err) {
            console.error('There was an error in POST /users/login', err);
            response.status(500).json({ message: err.message });
        }
    });

    //PUT: updateTourSlots
    app.put('/tours/updateTourSlots', async (request, response) => {
        try {
            console.log('Initiating PUT /tours request');
            console.log('Request has body containing:', request.body);

            const tour = request.body.tour_Name;
            const newSlots = request.body.num_spaces_available;

            const results = await knex('tours').where({'tour_Name':tour}).update({'num_spaces_available':newSlots});
            response.status(200).json(results);
        } catch (err) {
            console.error('There was an error in PUT /tours/updateTourSlots', err);
            response.status(500).json({ message: err.message });
        }
    });

    //DELETE: removeTour
}