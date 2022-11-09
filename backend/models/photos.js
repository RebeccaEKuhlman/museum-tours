const knex = require('../database/knex');
const PHOTOS_TABLE = 'photos';

const postPhoto = async (photo_data, caption, is_profile) => {
    const query = knex('photos').insert({ photo_data: photo_data, caption: caption, is_profile: is_profile });
    const results = await query;
    return results;
}

const updatePhotoData = async (photoId, photo_data) => {
    const query = knex('photos').where({ photoId: photoId }).update({ photo_data: photo_data });
    const results = await query;
    return results;
}

const updatePhotoCaption = async (photoId, caption) => {
    const query = knex('photos').where({ photoId: photoId }).update({ caption: caption });
    const results = await query;
    return results;
}

const updatePhotois_profile = async (photoId, is_profile) => {
    const query = knex('photos').where({ photoId: photoId }).update({ is_profile: is_profile });
    const results = await query;
    return results;
}

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

const deletePhoto = async (photoId) => {
    const query = knex('photos').where({ photoId: photoId }).delete();
    const results = await query;
    return results;
}

module.exports = {
    postPhoto,
    updatePhotoData,
    updatePhotoCaption,
    updatePhotois_profile,
    getAllPhotos,
    getPhotosByMuseum,
    deletePhoto
}