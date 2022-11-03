const knex = require('../database/knex');
const BOOKINGS_TABLE = 'bookings';

const insert_booking = async (username, tour_name) => {
    const query = knex(BOOKINGS_TABLE).insert({ username, tour_name });
    const results = await query;
    return results;
}

module.exports = {
    insert_booking
}