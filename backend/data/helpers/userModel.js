const db = require('../dbConfig');

module.exports = {
  getByAuth: (id) => {
    // Look up by auth0 id
    return db('users').where('authId', id).first();
  },

  get: (id) => {
    // Look up by userId
    return db('users').where('userId', id).first();
  }
};