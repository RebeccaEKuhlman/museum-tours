const knex = require('../database/knex');
const USERS_TABLE = 'users';

const updateUser = async (email, username) => {
    console.log(username)
    const query = knex(USERS_TABLE).update({ email }).where({ username });
    const results = await query;
    return results;
}

module.exports = {
    updateUser
}