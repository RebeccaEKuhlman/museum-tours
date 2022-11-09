const knex = require('../database/knex.js');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.post('/', async (req, res, next) => {
    try {
        const museum = await req.models.museum.postMuseum(req.body.museum_name, req.body.photo_id, req.body.director, req.body.num_exhibits);
        res.status(200).json(museum);
        next();
    } catch (err) {
        console.error('There was an error in POST /museums', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res, next) => {
    try {
        if (req.query.museum_name) {
            const museum = await req.models.museum.getByMuseumName(req.query.museum_name);
            res.status(200).json(museum);
            next();
        } else {
            // get all museums
            const museums = await req.models.museum.getMuseums();
            res.status(200).json(museums);
            next();
        }
        
    } catch(err) {
        console.error('There was an error in GET /museums', err);
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;