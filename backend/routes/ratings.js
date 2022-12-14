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

        if(rating){
            const check = await req.models.rating.getRating(rating);
            res.status(201).json(check);
        }
        else{
            console.error('There was an error in POST /ratings.');
            res.status(400).json('Make sure all needed data is included');
        }
        next();
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
        res.status(200).json();
        next();
    } catch(err) {
        console.error('There was an error in DELETE /ratings', err);
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;