const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    try {
        if (req.query.username && req.query.tourName) {
            const updatedUser = await req.models.booking.getSpecificBooking(req.query.username, req.query.tourName);
            res.json(updatedUser);
            next();
        } else if (req.query.username) {
            const updatedUser = await req.models.booking.getByUsername(req.query.username);
            res.json(updatedUser);
            next();
        } else if (req.query.tourName) {
            const updatedUser = await req.models.booking.getByTourName(req.query.tourName);
            res.json(updatedUser);
            next();
        } else {
            const updatedUser = await req.models.booking.getAllBookings();
            res.json(updatedUser);
            next();
        }
    } catch (err) {
        console.error('There was an error in POST /users/login', err);
        response.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res, next) => {
    try {
        if (req.query.username && req.query.tourName) {
            const updatedUser = await req.models.booking.insert_booking(req.query.username, req.query.tourName);
            res.json(updatedUser);
            next();
        } else {
            throw new Error('Make sure all needed data is encluded\n');
        }
    } catch (err) {
        console.error('There was an error in POST /users/login', err);
        response.status(500).json({ message: err.message });
    }
});

router.delete('/', async (req, res, next) => {
    try {
        if (req.query.username && req.query.tourName) {
            const updatedUser = await req.models.booking.deleteSpecificBooking(req.query.username, req.query.tourName);
            res.json(updatedUser);
            next();
        } else if (req.query.username) {
            const updatedUser = await req.models.booking.deleteByUsername(req.query.username);
            res.json(updatedUser);
            next();
        } else if (req.query.tourName) {
            const updatedUser = await req.models.booking.deleteByTourName(req.query.tourName);
            res.json(updatedUser);
            next();
        } else {
            const updatedUser = await req.models.booking.deleteBooking();
            res.json(updatedUser);
            next();
        }
    } catch (err) {
        console.error('There was an error in POST /users/login', err);
        response.status(500).json({ message: err.message });
    }
});

module.exports = router;
