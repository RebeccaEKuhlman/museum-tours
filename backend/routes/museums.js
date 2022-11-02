
const knex = require('../database/knex.js');
const express = require('express');
const pool = require('../db');
module.exports = function museums(app, logger) {

  //fetchToursByName, fetchToursByMuseum_name, and fetchAllTours
  //not in models\tours: fetchTourByPrice
  app.get('/museums', async (request, response) => {
      try {

          // if(request.body.tour_Name){
          //     const results = await knex('tours').select().where( {'tour_Name':request.body.tour_Name} );
          //     response.status(201).json(results);
          // }
          // else if(request.body.museum_name){
          //     const results = await knex('tours').select().where( {'museum_name':request.body.museum_name} );
          //     response.status(201).json(results);
          // }
          // else if(request.body.price){
          //     //returns all tours that are at the requested price and below
          //     const results = await knex('tours').select().whereBetween('price', [0, request.body.price]);
          //     response.status(201).json(results);
          // }
          // else{
          const results = await knex("museums").select();
          response.status(201).json(results);
          // }
      } catch (err) {
          console.error('There was an error in GET /museums', err);
          response.status(500).json({ message: err.message });
      }
  });
}