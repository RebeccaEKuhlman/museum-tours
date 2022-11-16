//add_ratings_table.js
exports.up = function(knex) {
    return knex.schema.createTable('ratings', (table) => {
      table.integer('ratingID').notNullable();
      table.integer('rating').notNullable();
      table.string('username').notNullable();
      table.string('tour_Name').notNullable();
      table.string('museum_name').notNullable();
      table.foreign('username').references('users.username');
      table.foreign('tour_Name').references('tours.tour_Name');
      table.foreign('museum_name').references('museums.museum_name');
      table.primary('ratingID');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ratings');
};
