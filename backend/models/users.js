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
    const bcrypt = require('bcrypt');
    const knex = require('../database/knex');
    const fetchAllUsers = async () => {
        const query = knex('users');
        const results = await query;
        return results;
    }
    const fetchUsersByName = async (username) => {
        const query = knex.from('users').select().where(username);
       // const query = knex.select().where({username: username}).from('users');
        const results = await query;
        return results;
    }
    const fetchUsersByEmail = async (givenEmail) => {
       // const query = knex('users').select().where({email: givenEmail});
       console.log("inside fetch by email");
       console.log(givenEmail);
        const query = knex('users').where({ email: givenEmail }).select();
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
 