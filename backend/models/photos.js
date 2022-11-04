const knex = require('../database/knex');
const PHOTOS_TABLE = 'photos';

const getAllPhotos = async () => {
    const query = knex(PHOTOS_TABLE);
    const results = await query;
    return results;
}

const getPhotosByMuseum = async (museum) => {
    const query = knex('photos').join('museums', 'photos.photoId', '=', 'museums.photoId')
        .select('photos.photo_data').where('museums.museum_name', '=', museum);;
    const results = await query;
    return results;
}

module.exports = {
    getAllPhotos,
    getPhotosByMuseum
}