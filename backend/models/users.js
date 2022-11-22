/**const { nextTick } = require('process');


const jwt = require('jsonwebtoken' );
class User {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }const getAllPhotos = async () => 
    close () {
        this.disconnect();
    }**/// GIVES USER BASED OFF OF TOKEN

const accessTokenSecret  = 'accessToken' ;
const jwt = require('jsonwebtoken' );
const bcrypt = require('bcryptjs');
const knex = require('../database/knex');

const addUser = async (username, password, email, joinDate, photoId) => {
    const results = await knex('users').insert( {username, password, email, joinDate, photoId} );
    return results;
}

const deleteUser = async (username) => {
    const results = await knex('users').delete().where( {'username':username} );
    return results;
}

const updateUserPassword = async(username, password) =>{
    const results = await knex('users').where({'username':username}).update({'password':password});
    return results;
}

const updateUserBio = async(username, bio) =>{
    const results = await knex('users').where({'username':username}).update({'bio':bio});
    return results;
}

const fetchAllUsers = async () => {
    const results = await knex('users').select();
    return results;
}

const fetchUsersByName = async (username) => {
    const query = knex.from('users').select().where( {username:username} );
    // const query = knex.select().where({username: username}).from('users');
    const results = await query;
    return results;
}

const fetchUsersByEmail = async (givenEmail) => {
    // const query = knex('users').select().where({email: givenEmail});
    console.log("inside fetch by email");
    console.log(givenEmail);
    const query = knex('users').select().where({ email: givenEmail });
    const results = await query;
    return results;
}

const authenticateUser = async  (username, password) =>{
    const users = await fetchUsersByName(username);
    console.log('Results of users query', users);
    if (users.length === 0) {
        throw new Error(`No users matched the email: ${email}`);
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        const accessToken = jwt.sign({ ...users[0], claims: ['user'] }, accessTokenSecret );
        console.log('Access granted');
        return accessToken;
    }

    throw new Error(`Incorrect creditials`);
}
     
 module.exports = {addUser, deleteUser, updateUserPassword, updateUserBio, fetchAllUsers, authenticateUser,
                   fetchUsersByEmail, fetchUsersByName};
 