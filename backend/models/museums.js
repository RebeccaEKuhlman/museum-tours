const knex = require('../database/knex');

const postMuseum = async (museum_name, photoId, director, num_exhibits, whatsNew) => {
    const query = knex('museums').insert({ museum_name: museum_name, photoId: photoId, director: director, num_exhibits: num_exhibits, whatsNew: whatsNew });
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

const getMuseumPhoto = async (museum_name) => {
    const query = knex('museums').where({ museum_name: museum_name }).select('photoId');
    const result1 = await query;
    const photoId = result1[0].photoId;
    console.log("First query", photoId);
    
    const query2 = knex('photos').where({ photoId: photoId }).select('photo_data');
    const photo_data = await query2;
    console.log("Second Query", photo_data[0].photo_data);
    return photo_data[0].photo_data;
}

const updateMuseumNum_exhibits = async (museum_name, num_exhibits) => {
    const query = knex('museums').where({ museum_name: museum_name }).update({ 'num_exhibits': num_exhibits });
    const results = await query;
    return results;
}

const updateMuseumPhotoId = async (museum_name, photoId) => {
    const query = knex('museums').where({ museum_name: museum_name }).update({ photoId: photoId }).select('photoId');
    const results = await query;
    return results;
}

const updateMuseumWhatsNew = async (museum_name, whatsNew) => {
    const query = knex('museums').where({ museum_name: museum_name }).update({ whatsNew: whatsNew }).select('whatsNew');
    const results = await query;
    return results;
}

const deleteMuseum = async (museum_name) => {
    const query = knex('museums').where({ museum_name: museum_name }).delete();
    const results = await query;
    return results;
}


module.exports = {
    postMuseum,
    getMuseums,
    getByMuseumName,
    getMuseumPhoto,
    updateMuseumNum_exhibits,
    updateMuseumPhotoId,
    updateMuseumWhatsNew,
    deleteMuseum
}