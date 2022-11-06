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

module.exports = function tours(app, logger) {
    
    app.get('/ratings', async (request, response) => {
        try {
            const results = await knex("ratings").select();
            response.status(201).json(results);
        } catch (err) {
            console.error('There was an error in GET /ratings', err);
            response.status(500).json({ message: err.message });
        }
    });

    

}