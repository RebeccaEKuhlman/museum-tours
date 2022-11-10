//add_photos_table.js
exports.up = function(knex) {
    return knex.schema.createTable('photos', (table) => {
      table.int('photoId').notNullable();
      table.bool('is_profile');
      table.string('photo_data');
      table.string('caption');
      table.primary('photoId');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('photos');
};
