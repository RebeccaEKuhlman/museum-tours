//add_users_table.js
exports.up = function(knex) {
 return knex.schema.createTable('users', (table) => {
   table.string('username').notNullable();
   table.string('password').notNullable();
   table.string('email').notNullable();
   table.date('tourDate').notNullable();
   table.int('photoId').notNullable();
   table.bool('is_director');
   table.string('bio');
   table.primary('username');
   table.foreign('photoId').references('photos.photoId');
 });
};

exports.down = function(knex) {
 return knex.schema.dropTable('users');
};