const db = require('../dbConfig');

module.exports = {
  getByAuth: (id) => {
    // Look up by auth0 id
    const result = db('users').where('authId', id).first();
    if( result.length > 0 ) return "0";
    else return result;
  },

  get: (id) => {
    // Look up by userId
    const result = db('users').where('userId', id).first();
    if( result.length > 0 )
      return "0";
    else
      return result;
  }
};