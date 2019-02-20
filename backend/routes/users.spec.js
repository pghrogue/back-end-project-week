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

  describe('GET /user/', () => {
    
    test('/user/getByAuth returns userId', () => {});

    test('/user/getByAuth returns 0 if not found', () => {});

    test('/user/:id returns user', () => {});

    test('/user/:id returns status 404 if not found', () => {});

  }); // end user/get

  describe('POST /user/', () => {

    test('/user inserts new userdata', () => {});

    test('missing authId returns error', () => {});
  }); // end user/post

}); // end user route