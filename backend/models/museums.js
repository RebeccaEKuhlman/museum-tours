const knex = require('../database/knex');

const postMuseum = async (museum_name, photo_id, director, num_exhibits) => {
    const query = knex('museums').insert({ museum_name: museum_name, photo_id: photo_id, director: director, num_exhibits: num_exhibits });
    const results = await query;
    return results;
}

const getMuseums = async () => {
    const query = knex('museums').select();
    const results = await query;
    return results;
}

const getByMuseumName = async (museum_name) => {
    const query = knex('museums').where({ museum_name: museum_name }).select();
    const results = await query;
    return results;
}

module.exports = {
    postMuseum,
    getMuseums,
    getByMuseumName
}