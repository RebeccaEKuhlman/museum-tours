const knex = require('../database/knex');
const USERS_TABLE = 'users';

const updateUser = async (field, username) => {
    const query = knex(USERS_TABLE).update({ field }).where({ username });
    const results = await query;
    return results;
}

module.exports = {
    updateUser
}