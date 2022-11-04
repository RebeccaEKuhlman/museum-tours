const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const { getPhotosByMuseum } = require('../models/photos');
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    try {
        const all_photos = await req.models.photo.getAllPhotos();
        res.status(200).json(all_photos);
        console.log(res)
        next();
    } catch (err) {
        console.error('There was an error in GET /photos', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/museums', async (req, res, next) => {
    try {
        const photosByMuseum = await req.models.photo.getPhotosByMuseum(req.query.museum);
        res.status(200).json(photosByMuseum);
        next();
    } catch (err) {
        console.error('There was an error in GET /photos/museums', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
