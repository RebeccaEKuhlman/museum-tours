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

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    try {
        console.log('Initiating POST /ratings request');
        console.log('Request has a body / payload containing:', req.body);
        const rating = await req.models.rating.postRating(
            req.body.rating,
            req.body.username,
            req.body.tour_Name,
            req.body.museum_name
        );
        res.status(201).json(rating);
    } catch(err) {
        console.error('There was an error in POST /ratings', err);
        res.status(500).json({ message: err.message });
    }
});
router.get('/', async (req, res, next) => {
    try {
        const ratings = await req.models.rating.getAllRatings();
        res.status(200).json(ratings);
    } catch(err) {
        console.error('There was an error in GET /ratings', err);
        response.status(500).json({ message: err.message });
    }
});
router.delete('/', async (req, res, next) => {
    try {
        const rating = await req.models.rating.deleteRating(req.query.ratingId);
        res.status(200).json(rating);
        next();
    } catch(err) {
        console.error('There was an error in DELETE /ratings', err);
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;