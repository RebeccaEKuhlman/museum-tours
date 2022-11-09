/**
 * tours(
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
);
 **/

const knex = require('../database/knex');
const TOUR_TABLE = 'tours';

const getAllTours = async () => {
    const results = await knex(TOUR_TABLE).select();
    return results;
}

const getToursbyName = async (tour_Name) => {
    const results = await knex(TOUR_TABLE).select().where( {tour_Name} );
    return results;
}

const getToursbyMuseum = async (museum_name) => {
    const results = await knex(TOUR_TABLE).select().where( {museum_name} );
    return results;
}

const getToursbyPrice = async (price) => {
    const results = await knex(TOUR_TABLE).select().whereBetween('price', [0, price]);;
    return results;
}

const getToursbyDay = async (month, day) => {
    const results = await knex(TOUR_TABLE).select().andWhereRaw('MONTH(tourDate) = ? AND DAY(tourDate) = ?',
                                                                 [month, day]);
    return results;
}

const getToursbyMonth = async (month) => {
    const results = await knex(TOUR_TABLE).select().andWhereRaw('MONTH(tourDate) = ?', month);
    return results;
}

const getToursbyYear = async (year) => {
    const results = await knex(TOUR_TABLE).select().andWhereRaw('YEAR(tourDate) = ?', year);
    return results;
}

const getToursbyWeek = async (startDate, endDate) => {
    const results = await knex(TOUR_TABLE).select().whereBetween('tourDate', [startDate, endDate]);
    return results;
}

const getToursbyDate = async (date) => {
    const results = await knex(TOUR_TABLE).select().where( {date} );
    return results;
}

const getToursbyTheme = async (theme) => {
    const results = await knex(TOUR_TABLE).select().where( {theme} );
    return results;
}

const insertTour = async (tour_Name, tourDate, tourTime, num_spaces_available, total_space,
                                                         tour_description, price, museum_name, theme) => {

    const query = knex(TOUR_TABLE).insert({tour_Name, tourDate, tourTime, num_spaces_available, total_space,
                                                                tour_description, price, museum_name, theme});
    const results = await query;
    return results;
}

const updateTourName = async (tour, new_name) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'tour_Name':new_name});
    return results;
}

const updateTourSlots = async (tour, newSlots) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'num_spaces_available':newSlots});
    return results;
}

const updateTourDateTime = async (tour, newDate, newTime) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'tourDate':newDate, 'tourTime':newTime});
    return results;
}

const updateTourDate = async (tour, newDate) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'tourDate':newDate});
    return results;
}

const updateTourTime = async (tour, newTime) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'tourTime':newTime});
    return results;
}

const updateTourDescription = async (tour, new_description) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'tour_description':new_description});
    return results;
}

const updateTourPrice = async (tour, new_price) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'price':new_price});
    return results;
}

const updateTourTheme = async (tour, new_theme) => {
    const results = await knex(TOUR_TABLE).where({'tour_Name':tour}).update({'theme':new_theme});
    return results;
}

const deleteTour = async (tour) => {
    const results = await knex(TOUR_TABLE).delete().where({'tour_Name':tour});
    return results;
}

module.exports = {
    getAllTours,
    getToursbyName,
    getToursbyMuseum,
    getToursbyPrice,
    getToursbyDay,
    getToursbyMonth,
    getToursbyYear,
    getToursbyWeek,
    getToursbyDate,
    getToursbyTheme,
    insertTour,
    updateTourName,
    updateTourSlots,
    updateTourDateTime,
    updateTourDate,
    updateTourTime,
    updateTourDescription,
    updateTourPrice,
    updateTourTheme,
    deleteTour
}