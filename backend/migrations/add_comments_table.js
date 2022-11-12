//add_comments_table.js
exports.up = function(knex) {
    return knex.schema.createTable('comments', (table) => {
      table.integer('commNum').notNullable();
      table.string('content').notNullable();
      table.string('username').notNullable();
      table.string('tour_Name').notNullable();
      table.integer('review_id').notNullable();
      table.integer('like_sum');
      table.integer('overComment');
      table.foreign('username').references('users.username');
      table.foreign('tour_Name').references('tours.tour_Name');
      table.foreign('review_id').references('ratings.ratingID');
      table.primary('commNum');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};