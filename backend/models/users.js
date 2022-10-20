const knex = require('../database/knex');
const STUDENT_TABLE = 'users';

const updateUser = async (field, username) => {
    const query = knex(STUDENT_TABLE).update({ field }).where({ username });
    const results = await query;
    return results;
}

module.exports = {
    updateUser
}