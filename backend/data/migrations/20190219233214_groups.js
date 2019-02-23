// This table is mainly just an autoincrement tracker
exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', function(table){
    table.increments('groupId');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('groups');
};
