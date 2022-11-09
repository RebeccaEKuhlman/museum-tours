/** TABLE tours:
	tour_Name VARCHAR(30) NOT NULL PRIMARY KEY,
	tourDate Date NOT NULL,
	tourTime Time NOT NULL,
	num_spaces_available int NOT NULL,
	total_space int NOT NULL,
	tour_description VARCHAR(30),
	price int,
	museum_name varchar(30) NOT NULL,
	FOREIGN KEY (museum_name) REFERENCES museums(museum_name),
	theme VARCHAR(30) NOT NULL
**/

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET tours: allTours, byName, byMuseum_name, byPrice, byDay, byMonth, byYear, byWeek, byDate, byTheme */
router.get('/', async(request, response, next) => {
    try {
        console.log('Initiating GET /tours request');
        console.log('Request has params containing:', request.query);

        if(request.query.tour_Name){
            //query params: tour_Name = 'example string'
            const results = await request.models.tour.getToursbyName(request.query.tour_Name);
            response.status(200).json(results);
        }
        else if(request.query.museum_name){
            //returns all tours scheduled at the requested museum
            //query params: museum_name = 'example string'
            const results = await request.models.tour.getToursbyMuseum(request.query.museum_name);
            response.status(200).json(results);
        }
        else if(request.query.price){
            //returns all tours that are at the requested price and below
            //query params: price = integer
            const results = await request.models.tour.getToursbyPrice(request.query.price);
            response.status(200).json(results);
        }
        else if(request.query.month && request.query.day){
            //returns all tours scheduled at the requested day (needs a month to specify which day)
            //query params: month = integer between 1-12, day = integer between 1-31
            const results = await request.models.tour.getToursbyDay(request.query.month, request.query.day);
            response.status(200).json(results);
        }
        else if(request.query.month){
            //returns all tours scheduled at the requested month
            //query params: month = integer between 1-12
            const results = await request.models.tour.getToursbyMonth(request.query.month);
            response.status(200).json(results);
        }
        else if(request.query.year){
            //returns all tours scheduled at the requested year
            //query params: year = integer
            const results = await request.models.tour.getToursbyYear(request.query.year);
            response.status(200).json(results);
        }
        else if(request.query.startDate && request.query.endDate){
            //returns all tours scheduled in between startDate and endDate (a week)
            //query params: startDate = 'YYYY-MM-DD', endDate = 'YYYY-MM-DD'
            //note: make sure that the order of dates is correct to get accurate results
            const results = await request.models.tour.getToursbyWeek(request.query.startDate, request.query.endDate);
            response.status(200).json(results);
        }
        else if(request.query.date){
            //returns all tours scheduled at the requested date
            //query params: date = 'YYYY-MM-DD'
            const results = await request.models.tour.getToursbyDate(request.query.date);
            response.status(200).json(results);
        }
        else if(request.query.theme){
            //returns all tours that belong to the requested theme
            //query params: theme = 'example string'
            const results = await request.models.tour.getToursbyTheme(request.query.theme);
            response.status(200).json(results);
        }
        else{
            const results = await request.models.tour.getAllTours();
            response.status(200).json(results);
        }

        next();
    } catch (err) {
        console.error('There was an error in GET /tours', err);
        response.status(500).json({ message: err.message });
    }
});

//POST tours: insertTour
router.post('/', async(request, response, next) => {
    try {
        console.log('Initiating POST /tours request');
        console.log('Request has a body containing:', request.body);

        const tour_Name = request.body.tour_Name;
        const tourDate = new Date(request.body.tourDate);
        const tourTime = request.body.tourTime;
        const num_spaces_available = request.body.spaces_available;
        const total_space = request.body.total_space;
        const tour_description = request.body.description;
        const price = request.body.price;
        const museum_name = request.body.museum_name;
        const theme = request.body.theme;

        const results = await request.models.tour.insertTour(tour_Name, tourDate, tourTime, num_spaces_available,
                                                             total_space, tour_description, price, museum_name, theme);
        response.status(201).json(results);
        next();
    } catch (err) {
        console.error('There was an error in POST /tours', err);
        response.status(500).json({ message: err.message });
    }
});

//PUT tours: TourName, TourSlots, TourDateTime, TourDescription, TourPrice, TourTheme
router.put('/updateTourName', async(request, response, next) => {
    try {
        console.log('Initiating PUT /tours/updateTourName request');
        console.log('Request has body containing:', request.body);

        const tour = request.body.tour_Name;
        const newName = request.body.new_name;

        const results = await request.models.tour.updateTourName(tour, newName);
        response.status(200).json(results);
        next();
    } catch (err) {
            console.error('There was an error in PUT /tours/updateTourName', err);
            response.status(500).json({ message: err.message });
    }
});

router.put('/updateTourSlots', async(request, response, next) => {
    try {
        console.log('Initiating PUT /tours/updateTourSlots request');
        console.log('Request has body containing:', request.body);

        const tour = request.body.tour_Name;
        const newSlots = request.body.num_spaces_available;

        const results = await request.models.tour.updateTourSlots(tour, newSlots);
        response.status(200).json(results);
        next();
    } catch (err) {
            console.error('There was an error in PUT /tours/updateTourSlots', err);
            response.status(500).json({ message: err.message });
    }
});

router.put('/updateTourDateTime', async (request, response, next) => {
    try {
        console.log('Initiating PUT /tours/updateTourDateTime request');
        console.log('Request has body containing:', request.body);

        const tour = request.body.tour_Name;
        const newDate = request.body.tourDate; //format: YYYY-MM-DD"
        const newTime = request.body.tourTime; //format: "00:00:00" hr:min:sec in military time

        if(newDate && newTime){
            const results = await request.models.tour.updateTourDateTime(tour, newDate, newTime);
            response.status(200).json(results);
        }
        else if(newDate){
            const results = await request.models.tour.updateTourDate(tour, newDate);
            response.status(200).json(results);
        }
        else if(newTime){
            const results = await request.models.tour.updateTourTime(tour, newTime);
            response.status(200).json(results);
        }
        else{
            response.status(400).json(); //if there's nothing in the body
            console.log('There was an error in PUT /tours/updateTourDateTime', request.body);
        }
        next();
    } catch (err) {
        console.error('There was an error in PUT /tours/updateTourDateTime', err);
        response.status(500).json({ message: err.message });
    }
});

router.put('/updateTourDescription', async(request, response, next) => {
    try {
        console.log('Initiating PUT /tours/updateTourDescription request');
        console.log('Request has body containing:', request.body);

        const tour = request.body.tour_Name;
        const newSummary = request.body.tour_description;

        const results = await request.models.tour.updateTourDescription(tour, newSummary);
        response.status(200).json(results);
        next();
    } catch (err) {
            console.error('There was an error in PUT /tours/updateTourDescription', err);
            response.status(500).json({ message: err.message });
    }
});

router.put('/updateTourPrice', async(request, response, next) => {
    try {
        console.log('Initiating PUT /tours/updateTourPrice request');
        console.log('Request has body containing:', request.body);

        const tour = request.body.tour_Name;
        const newPrice = request.body.price;

        const results = await request.models.tour.updateTourPrice(tour, newPrice);
        response.status(200).json(results);
        next();
    } catch (err) {
            console.error('There was an error in PUT /tours/updateTourPrice', err);
            response.status(500).json({ message: err.message });
    }
});

router.put('/updateTourTheme', async(request, response, next) => {
    try {
        console.log('Initiating PUT /tours/updateTourTheme request');
        console.log('Request has body containing:', request.body);

        const tour = request.body.tour_Name;
        const newTheme = request.body.theme;

        const results = await request.models.tour.updateTourTheme(tour, newTheme);
        response.status(200).json(results);
        next();
    } catch (err) {
            console.error('There was an error in PUT /tours/updateTourTheme', err);
            response.status(500).json({ message: err.message });
    }
});

router.delete('/', async (request, response, next) => {
    try {
       console.log('Initiating DELETE /tours request');
       console.log('Request has params containing:', request.query);

       const results = await request.models.tour.deleteTour(request.query.tour_Name);
       console.log('Results of my DELETE statement:', results);
       response.status(200).json(results);
       next();
    } catch (err) {
        console.error('There was an error in DELETE /tours', err);
        response.status(500).json({ message: err.message });
    }
});

module.exports = router;