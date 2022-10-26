/**
    username VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    joinDate DATE NOT NULL,
    photoId INT NOT NULL,
    uni_affilation VARCHAR(50),
    is_director BOOL DEFAULT False,
    bio VARCHAR(100),
    FOREIGN KEY (photoId) REFERENCES photos(photoId)
    * */    

const knex = require('../database/knex.js')
module.exports = function users(app, logger) {
    
}