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
    
    test('/user/getByAuth returns userId', async () => {
      const response = await request(server).get('/user/getByAuth/abcd1');
      
      const expected = {
        "userId": 1,
        "authId": "abcd1",
        "email": "abc123@def.com"
      };

      expect(response.status).toEqual(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(expected);
      expect(response.body).not.toEqual({ error: "User information could not be retrieved." });
  
    });

    test('/user/getByAuth returns nothing if not found', async () => {
      const response = await request(server).get('/user/getByAuth/abcd5');
      
      expect(response.status).toEqual(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual("");
      expect(response.body).not.toEqual({ error: "User information could not be retrieved." });
  
    });

    test('/user/:id returns user', async () => {
      const response = await request(server).get('/user/1');
      const expected = {
        "userId": 1,
        "authId": "abcd1",
        "email": "abc123@def.com"
      };
      expect(response.status).toEqual(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(expected);
      expect(response.body).not.toEqual({ error: "User information could not be retrieved." });
    });

    test('/user/:id returns status 404 if not found', () => {});

  }); // end user/get

  describe('POST /user/', () => {

    test('/user inserts new userdata', () => {});

    test('missing authId returns error', () => {});
  }); // end user/post

}); // end user route