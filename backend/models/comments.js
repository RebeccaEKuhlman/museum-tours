const knex = require('../database/knex');
const COMMENT_TABLE = 'comments';

const fetchAllComments = async () => {
    const results = await knex(COMMENT_TABLE).select();
    return results;
}

const fetchCommentsByOverComment = async (overComment) => {
    const results = await knex(COMMENT_TABLE).select().where( {overComment} );
    return results;
}

const fetchCommentsByTourName = async (tour_Name) => {
    const results = await knex(COMMENT_TABLE).select().where( {tour_Name} );
    return results;
}

module.exports = {
    fetchAllComments,
    fetchCommentsByTourName,
    fetchCommentsByOverComment
}