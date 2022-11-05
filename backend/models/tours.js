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

class Tour {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }
    close () {
        this.disconnect();
    }

    ///// GET ROUTES /////
    async fetchAllTours () {
        const results = await this.DBQuery('SELECT * FROM tours');
        return results;
    }
    async fetchToursByName (tour_Name) {
        const results = await this.DBQuery('SELECT * FROM tours WHERE tour_Name = ?', [tour_Name]);
        return results;
    }
    async fetchToursByMuseum_name (museum_name) {
        const results = await this.DBQuery('SELECT * FROM tours WHERE museum_name = ?', [museum_name]);
        return results;
    }
    async fetchToursByPrice (price) {
        const results = await this.DBQuery('SELECT * FROM tours WHERE price BETWEEN 0 AND ?', [price]);
        return results;
    }
    async fetchToursByMonth (month) {
        const results = await this.DBQuery('SELECT * FROM tours WHERE MONTH(tourDate) = ?', [month]);
        return results;
    }
    async fetchToursByYear (year) {
        const results = await this.DBQuery('SELECT * FROM tours WHERE YEAR(tourDate) = ?', [year]);
        return results;
    }

    ///// POST ROUTES /////

    ///// PUT ROUTES /////
    async updateTourSlots (tour_Name, numSlots) {
        return knex('tours')
            .where({ tour_Name: tour_Name })
            .update({ num_spaces_available: numSlots })
    }

    ///// DELETE ROUTES /////
 }
 module.exports = Tour;