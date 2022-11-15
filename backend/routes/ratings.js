/**
 * rating INT NOT NULL,
	username VARCHAR(30) NOT NULL,
	tour_Name VARCHAR(30) NOT NULL,
	museum_name VARCHAR(30) NOT NULL,
	FOREIGN KEY (username) REFERENCES users(username),
  	FOREIGN KEY (tour_Name) REFERENCES tours(tour_Name),
	FOREIGN KEY (museum_name) REFERENCES museums(museum_name),
	ratingID int NOT NULL,
	PRIMARY KEY (ratingID)
 */

const knex = require('../database/knex.js');

module.exports = function ratings(app, logger) {
    
    app.get('/ratings', async (request, response) => {
        try {
            const results = await knex("ratings").select();
            response.status(201).json(results);
        } catch (err) {
            console.error('There was an error in GET /ratings', err);
            response.status(500).json({ message: err.message });
        }
    });

    app.post('/ratings/newRating', async (request, response) => {
        try {
            console.log('Initiating POST /ratings/newRating request');
            console.log('Request has a body / payload containing:', request.body);
            console.log('Request has params containing:', request.query);
            const payload = request.body; // This payload should be an object containing user data
            const query = knex('ratings').insert({ 
                rating: request.body.rating,
                username: request.body.username,
                tour_name: request.body.tour_name,
                museum_name: request.body.museum_name,
                ratingID: request.body.ratingID,
            })
            const results = await query;
            console.log('Results of my POST statement:', results);
            response.status(201).json(results);
        } catch (err) {
            console.error('There was an error in POST /ratings', err);
            response.status(500).json({ message: err.message });
        }
    });
}