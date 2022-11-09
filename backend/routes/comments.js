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

        app.post('/comments/newComment', async (request, response) => {
            try {
                console.log('Initiating POST /comments/newComments request');
                console.log('Request has a body / payload containing:', request.body);
                console.log('Request has params containing:', request.query);
                const payload = request.body; // This payload should be an object containing user data
                const query = knex('comments').insert({ 
                    content: request.body.content,
                    username: request.body.username,
                    tour_name: request.body.tour_name,
                    review_id: request.body.review_id,
                    like_sum: request.body.likesum,
                    overComment: request.body.overComment
                })
                const results = await query;
                console.log('Results of my POST statement:', results);
                response.status(201).json(results);
            } catch (err) {
                console.error('There was an error in POST /comments', err);
                response.status(500).json({ message: err.message });
            }
        });
    }