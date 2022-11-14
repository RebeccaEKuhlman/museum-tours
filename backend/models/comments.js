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

const insertComment = async (content, username, tour_Name, review_id, like_sum, overComment) => {
    const query = knex(COMMENT_TABLE).insert({content, username, tour_Name, review_id, like_sum, overComment});
    const results = await query;
    return results;
}

module.exports = {
    fetchAllComments,
    fetchCommentsByTourName,
    fetchCommentsByOverComment,
    insertComment
}