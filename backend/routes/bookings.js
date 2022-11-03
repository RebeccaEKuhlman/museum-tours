const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/username', async (req, res, next) => {
    try {
        if (req.params.email) {
            const updatedUser = await req.models.bookings.getUsername(req.params.username);
            res.json(updatedUser);
            next();
        }
    } catch (err) {
        console.error('There was an error in GET /bookings/username', err);
        response.status(500).json({ message: err.message });
    }
});

router.get('/tourName', async (req, res, next) => {
    try {
        if (req.params.tourName) {
            const updatedUser = await req.models.bookings.getTourName(req.params.tourName);
            res.json(updatedUser);
            next();
        }
    } catch (err) {
        console.error('There was an error in GET /bookings/tourName', err);
        response.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const updatedUser = await req.models.bookings.get_all_tours();
        res.json(updatedUser);
        next();
    } catch (err) {
        console.error('There was an error in GET /bookings/', err);
        response.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res, next) => {
    try {
        if (req.params.username && req.params.tourName) {
            const updatedUser = await req.models.bookings.insert_booking(req.params.username, req.params.tourName);
            res.json(updatedUser);
            next();
        }
    } catch (err) {
        console.error('There was an error in POST /users/login', err);
        response.status(500).json({ message: err.message });
    }
});

router.delete('/', async (req, res, next) => {
    try {
        if (req.params.username && req.params.tourName) {
            const updatedUser = await req.models.bookings.delete_booking(req.params.tourName, req.params.username);
            res.json(updatedUser);
            next();
        }
    } catch (err) {
        console.error('There was an error in POST /users/login', err);
        response.status(500).json({ message: err.message });
    }
});

module.exports = router;
