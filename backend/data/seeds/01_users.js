
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userId: 1, authId: 'abcd1', email: 'abc123@def.com'},
        {userId: 2, authId: 'abcd2', email: 'abc234@def.com'},
        {userId: 3, authId: 'abcd3', email: 'abc345@def.com'}
      ]);
    });
};
