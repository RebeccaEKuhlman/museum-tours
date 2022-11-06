/**
 * TABLE comments(
	commNum int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	content VARCHAR(100) NOT NULL,
	username VARCHAR(30) NOT NULL,
	tour_Name VARCHAR(30) NOT NULL,
	review_id INT NOT NULL,
	FOREIGN KEY (username) REFERENCES users(username),
   	FOREIGN KEY (tour_Name) REFERENCES tours(tour_Name),
   	like_sum int DEFAULT 0,
   	overComment int,
	FOREIGN KEY(review_id) REFERENCES ratings(ratingID)
);
 */
    const knex = require('../database/knex.js');

    module.exports = function comments(app, logger) {
        
        app.get('/comments', async (request, response) => {
            try {
                const results = await knex("comments").select();
                response.status(201).json(results);
            } catch (err) {
                console.error('There was an error in GET /comments', err);
                response.status(500).json({ message: err.message });
            }
        });    
    }