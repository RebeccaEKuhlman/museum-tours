//add_tours_table.js
exports.up = function(knex) {
    return knex.schema.createTable('tours', (table) => {
      table.string('tour_Name').notNullable();
      table.string('museum_name').notNullable();
      table.primary('tour_name');
    });
   };
   exports.down = function(knex) {
    return knex.schema.dropTable('tours');
   };