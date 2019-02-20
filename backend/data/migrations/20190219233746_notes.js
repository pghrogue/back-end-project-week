
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(table) {
    table.increments('noteId');
    table.integer('userId').unsigned().notNullable();
    table.string('title');
    table.string('textBody');
    table.integer('groupId');

    table.foreign('userId').references('userId').inTable('users');
    table.foreign('groupId').references('groupId').inTable('usergroups');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
