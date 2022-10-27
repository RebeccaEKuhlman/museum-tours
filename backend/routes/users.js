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

const knex = require('../database/knex.js');

module.exports = function users(app, logger) {
    app.get('/users', async (request, response) => {
            if (req.query.username) {
                const usersByName = await req.models.student.fetchUsersByName(req.query.name);
                res.json(usersByName);
                next();
            } else {
                const allUsers = await req.models.student.fetchAllUsers();
                res.json(allUsers);
                next();
        }
    });
}