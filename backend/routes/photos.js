const knex = require('../database/knex.js');
const express = require('express');
const pool = require('../db');

module.exports = function photos(app, logger) {
    app.get('/photos', async (request, response) => {
        try {
            const results = await knex('photos').select();
            response.status(200).json(results);
        } catch (err) {
            console.error('There was an error in GET /photos', err);
            response.status(500).json({ message: err.message });
        }
    });
}