/**const { nextTick } = require('process');

const accessTokenSecret  = 'mysupercoolsecret' ;
const jwt = require('jsonwebtoken' );
class User {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }const getAllPhotos = async () => 
    close () {
        this.disconnect();
    }**/// GIVES USER BASED OFF OF TOKEN
    const jwt = require('jsonwebtoken' );
    const knex = require('../database/knex');
    const fetchAllUsers = async () => {
        const query = knex('users');
        const results = await query;
        return results;
    }
    const fetchUsersByName = async (username) => {
        const query = knex('users').select().where({username});
        const results = await query;
        return results;
    }
    const fetchUsersByEmail = async (email) =>{
        const query = knex('users').select().where({email});
        const results = await query;
        return results;
    }
    const authenticateUser = async  (username, password) =>{
        const users = await fetchUsersByName(username);
        console.log('Results of users query', users);
        if (users.length === 0) {
            console.error(`No users matched the username: ${username}`);
            return null;
        }
        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const accessToken = jwt.sign({ ...users[0], claims: ['user'] }, accessTokenSecret );
            return accessToken;
        }
        return null;
        
     }
     
 module.exports = {fetchAllUsers, authenticateUser, fetchUsersByEmail, fetchUsersByName};
 