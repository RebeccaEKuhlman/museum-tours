const knex = require('../database/knex.js');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const { query } = require('express');
router.use(bodyParser.json());


router.post('/', async (req, res, next) => {
    try {
        const museum = await req.models.museum.postMuseum(req.body.museum_name, req.body.photoId, req.body.director,
                                                                                                req.body.num_exhibits);
        if(museum){
            const check = await req.models.museum.getByMuseumName(req.body.museum_name);
            res.status(201).json(check);
        }
        else{
            console.error('There was an error in POST /museums');
            res.status(500).json();
        }
        next();
    } catch (err) {
        console.error('There was an error in POST /museums', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res, next) => {
    try {
        if (req.query.getPhoto) {
            // pass in a "getPhoto" that is true in the body
            const photolink = await req.models.museum.getMuseumPhoto(req.query.museum_name);
            res.status(200).json(photolink);
            next();
        } else if (req.query.museum_name) {
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
});

router.put('/', async (req, res, next) => {
    try {
        if (req.body.photoId){
            const museum = await req.models.museum.updateMuseumPhotoId(req.body.museum_name, req.body.photoId);
        }
        else if (req.body.num_exhibits){
            const museum = await req.models.museum.updateMuseumNum_exhibits(req.body.museum_name, req.body.num_exhibits);
        }
        else {
            throw new Error('Make sure all needed data is included\n');
        }

        const check = await req.models.museum.getByMuseumName(req.body.museum_name);
        if(check)
            res.status(200).json(check);
        else{
            console.error('There was an error in PUT /museums');
            res.status(500).json();
        }
        next();
    } catch(err) {
        console.error('There was an error in PUT /museums', err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const museum = await req.models.museum.deleteMuseum(req.query.museum_name);
        res.status(200).json(museum);
        next();
    } catch(err) {
        console.error('There was an error in DELETE /museums', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;