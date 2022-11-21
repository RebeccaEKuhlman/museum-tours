const knex = require('../database/knex');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const { getPhotosByMuseum } = require('../models/photos');
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    try {
        const photoId = await req.models.photo.postPhoto(req.body.photo_data, req.body.caption, req.body.is_profile);
        if(photoId){
            const check = await req.models.photo.getPhoto(photoId);
            res.status(201).json(check);
        }
        else {
            throw new Error('Make sure all needed data is encluded\n');
        }
        next();
    } catch (err) {
        console.error('There was an error in POST /photos', err);
        res.status(500).json({ message: err.message });
    }
});

// use photoId returned from post to identify which photo to update
router.put('/', async (req, res, next) => {
    try {
        if (req.body.photo_data) {
            const photoId = await req.models.photo.updatePhotoData(req.body.photoId, req.body.photo_data);
            res.status(200).json(photoId);
            next();
        } else if (req.body.caption) {
            const photoId = await req.models.photo.updatePhotoCaption(req.body.photoId, req.body.caption);
            res.status(200).json(photoId);
            next();
        } else if (req.body.is_profile) {
            if (req.body.is_profile != "1" && req.body.is_profile != "0") {
                res.status(400).json({ message: "Invalid Input" });
            } else {
                const photoId = await req.models.photo.updatePhotois_profile(req.body.photoId, req.body.is_profile);
                res.status(200).json(photoId);
            }
            next();
        }
    } catch(err) {
        console.error('There was an error in PUT /photos', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res, next) => {
    try {
        if (req.query.photoId) {
            const photo = await req.models.photo.getPhotoData(req.query.photoId);
            res.status(200).json(photo);
            next();
        } else {
            const all_photos = await req.models.photo.getAllPhotos();
            res.status(200).json(all_photos);
            console.log(res)
            next();
        }
    } catch (err) {
        console.error('There was an error in GET /photos', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/museums', async (req, res, next) => {
    try {
        const photosByMuseum = await req.models.photo.getPhotosByMuseum(req.query.museum_name);
        console.log("output: ", photosByMuseum[0].photo_data);
        res.status(200).json(photosByMuseum[0].photo_data);
        next();
    } catch (err) {
        console.error('There was an error in GET /photos/museums', err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const photoId = await req.models.photo.deletePhoto(req.query.photoId);
        res.status(200).json(photoId);
        next();
    } catch(err) {
        console.error('There was an error in DELETE /photos', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
