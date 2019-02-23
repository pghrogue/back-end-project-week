// Internal userId with auth0 id
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('userId');
    table.string('authId').notNullable().unique();
    table.string('email').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
