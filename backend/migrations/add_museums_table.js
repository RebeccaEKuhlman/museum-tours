//add_museums_table.js
exports.up = function(knex) {
    return knex.schema.createTable('museums', (table) => {
      table.string('museum_name').notNullable();
      table.int('photoId').notNullable();
      table.string('director').notNullable();
      table.int('num_exhibits').notNullable();
      table.primary('museum_name');
      table.foreign('photoId').references('photos.photoId');
      table.foreign('director').references('users.username');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('museums');
};
