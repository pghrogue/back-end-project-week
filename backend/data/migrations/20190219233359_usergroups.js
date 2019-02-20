// Tracks which users belong to which groups for note collaboration
exports.up = function(knex, Promise) {
  return knex.schema.createTable('usergroups', function(table) {
    table.increments();
    table.integer('groupId').unsigned().notNullable();
    table.integer('userId').unsigned().notNullable();
    
    table.foreign('groupId').references('userId').inTable('users');
    table.foreign('userId').references('userId').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('usergroups');
};
