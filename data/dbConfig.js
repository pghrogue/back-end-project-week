const knex = require('knex');
const cfg = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(cfg[dbEnv]);