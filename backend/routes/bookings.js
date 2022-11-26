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
        console.error('There was an error in GET /bookings', err);
        response.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res, next) => {
    try {
        if (req.body.username && req.body.tourName) {
            const updatedUser = await req.models.booking.insert_booking(req.body.username, req.body.tourName);

            if(updatedUser){
                const check = await req.models.booking.getSpecificBooking(req.body.username, req.body.tourName);
                res.status(201).json(check); //returns the content
            }
            else{
                console.error('There was an error in POST /bookings');
                res.status(400).json();
            }
            next();
        } else{
            console.error('There was an error in POST /bookings');
            res.status(400).json('"Make sure all needed data is included');
        }
    } catch (err) {
        console.error('There was an error in POST /bookings', err);
        res.status(500).json({ message: err.message });
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
        console.error('There was an error in DELETE /bookings', err);
        response.status(500).json({ message: err.message });
    }
});

module.exports = router;
