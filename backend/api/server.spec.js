const request = require('supertest');
const server = require('./server.js');

const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.testing);

// Test to make sure test server is running ok.
describe('server.js', () => {
  test('the index route returns OK', async () => {
    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
  });
});

