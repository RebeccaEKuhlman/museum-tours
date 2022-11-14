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

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', async(request, response, next) => {
    try{
        console.log('Initiating GET /comments request');
        console.log('Request has params containing:', request.query);

        if(request.query.overComment){
            const results = await request.models.comment.fetchCommentsByOverComment(request.query.overComment);
            response.status(200).json(results);
        }
        else if(request.query.tour_Name){
            const results = await request.models.comment.fetchCommentsByTourName(request.query.tour_Name);
            response.status(200).json(results);
        }
        else{
            const results = await request.models.comment.fetchAllComments();
            response.status(200).json(results);
        }

        next();
    } catch(err){
        console.error('There was an error in GET /comments', err);
        response.status(500).json({ message: err.message });
    }

});

module.exports = router;