//add_tours_table.js
exports.up = function(knex) {
    return knex.schema.createTable('tours', (table) => {
      table.string('tour_Name').notNullable();
      table.date('tourDate').notNullable();
      table.time('tourTime').notNullable();
      table.integer('num_spaces_available').notNullable();
      table.integer('total_space').notNullable();
      table.string('tour_description').notNullable();
      table.integer('price');
      table.string('museum_name').notNullable();
      table.string('theme').notNullable();
      table.foreign('museum_name').references('museums.museum_name');
      table.primary('tour_name');
    });
   };

exports.down = function(knex) {
    return knex.schema.dropTable('tours');
};