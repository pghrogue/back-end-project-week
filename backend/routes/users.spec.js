const request = require('supertest');
const server = require('../api/server');

const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.testing);

describe('the /user routes', () => {
  test('the default route returns OK', async () => {
    const response = await request(server).get('/user');

    expect(response.status).toEqual(200);
  });
}); // end user route