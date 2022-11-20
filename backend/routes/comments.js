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
        else if(request.query.username && request.query.tour_Name && request.content){
            const results = await request.models.comment.fetchCommentsByTourName(request.query.username,
                                                                        request.query.tour_Name, request.query.content);
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

router.post('/', async(request, response, next) => {
    try{
        console.log('Initiating POST /comments request');
        console.log('Request has a body / payload containing:', request.body);

        const content = request.body.content;
        const username = request.body.username;
        const tour_Name = request.body.tour_Name;
        const review_id = request.body.review_id;
        const like_sum = request.body.like_sum;
        const overComment = request.body.overComment;

        const results = await request.models.comment.insertComment(content, username, tour_Name, review_id,
                                                                                      like_sum, overComment);
        response.status(201).json(results);
        next();
    } catch(err){
        console.error('There was an error in POST /comments', err);
        response.status(500).json({ message: err.message });
    }
});

router.delete('/', async (request, response, next) => {
    try {
       console.log('Initiating DELETE /comments request');
       console.log('Request has params containing:', request.query);

       const results = await request.models.comment.deleteComment(request.query.commNum);
       console.log('Results of my DELETE statement:', results);
       response.status(200).json(results);
       next();
    } catch (err) {
        console.error('There was an error in DELETE /comments', err);
        response.status(500).json({ message: err.message });
    }
});

module.exports = router;