const knex = require('../database/knex');
const RATINGS_TABLE = 'ratings';


const postRating = async (rating, username, tour_Name, museum_name) => {
    const query = knex(RATINGS_TABLE).insert({
        rating: rating, 
        username: username,
        tour_Name: tour_Name,
        museum_name: museum_name
    });
    const results = await query;
    return results;
}

const getAllRatings = async() => {
    const query = knex(RATINGS_TABLE).select();
    const results = await query;
    return results;
}

const getRating = async(ratingId) => {
    const results = await knex(RATINGS_TABLE).select().where( {ratingId: ratingId});
    return results;
}

const deleteRating = async(ratingId) => {
    const query = knex(RATINGS_TABLE).where({ ratingId: ratingId }).delete();
    const results = await query;
    return results;
}

module.exports = {
    postRating,
    getAllRatings,
    getRating,
    deleteRating
}