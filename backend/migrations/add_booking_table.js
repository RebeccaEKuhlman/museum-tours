//add_booking_table.js
exports.up = function(knex) {
    return knex.schema.createTable('booking', (table) => {
      table.integer('bookingID').notNullable();
      table.string('username').notNullable();
      table.string('tour_Name').notNullable();
      table.foreign('username').references('users.username');
      table.foreign('tour_Name').references('tours.tour_Name');
      table.primary('bookingID');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('booking');
};
