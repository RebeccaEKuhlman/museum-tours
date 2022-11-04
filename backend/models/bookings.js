const knex = require('../database/knex');
const BOOKINGS_TABLE = 'booking';

const insert_booking = async (username, tour_name) => {
    const query = knex(BOOKINGS_TABLE).insert({ username, tour_name });
    const results = await query;
    return results;
}

const getAllBookings = async () => {
    const query = knex(BOOKINGS_TABLE).select();
    const results = await query;
    return results;
}

const getByUsername = async (username) => {
    const query = knex(BOOKINGS_TABLE).select().where({ username });
    const results = await query;
    return results;
}

const getByTourName = async (tour_Name) => {
    const query = knex(BOOKINGS_TABLE).select().where({ tour_Name });
    const results = await query;
    return results;
}

const getSpecificBooking = async (username, tour_Name) => {
    const query = knex(BOOKINGS_TABLE).select().where({ username, tour_Name });
    const results = await query;
    return results;
}

const deleteBooking = async () => {
    const query = knex(BOOKINGS_TABLE).delete();
    const results = await query;
    return results;
}

const deleteByUsername = async (username) => {
    const query = knex(BOOKINGS_TABLE).delete().where({ username });
    const results = await query;
    return results;
}

const deleteByTourName = async (tour_Name) => {
    const query = knex(BOOKINGS_TABLE).delete().where({ tour_Name });
    const results = await query;
    return results;
}

const deleteSpecificBooking = async (username, tour_Name) => {
    const query = knex(BOOKINGS_TABLE).delete().where({ username, tour_Name });
    const results = await query;
    return results;
}

module.exports = {
    insert_booking,
    getByUsername,
    getByTourName,
    getAllBookings,
    getSpecificBooking,
    deleteBooking,
    deleteByUsername,
    deleteByTourName,
    deleteSpecificBooking
}