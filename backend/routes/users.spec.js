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

    test('/user/getByAuth returns 0 if not found', async () => {
      const response = await request(server).get('/user/getByAuth/abcd5');
      
      expect(response.status).toEqual(404);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(0);
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

    test('/user/:id returns status 404 if not found', async () => {
      const response = await request(server).get('/user/5');

      expect(response.status).toEqual(404);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(0);
      expect(response.body).not.toEqual({ error: "User information could not be retrieved." });
    });

  }); // end user/get

  describe('POST /user/', () => {
    afterEach( async () => {
      await db.seed.run();
    });

    test('/user/add inserts new userdata', async () => {
      const body = { "authId": 'abcd123', email: 'abcd456@def.com' };

      const response = await request(server)
        .post('/user/add')
        .send(body);

      expect(response.status).toEqual(200);
      expect(response.type).toBe('application/json');
      expect(response.body).not.toEqual({ error: "Missing authId or Email." });
    });

    test('/user/add returns new user', async () => {
      const body = { "authId": 'abcd123', email: 'abcd456@def.com' };
      const expected = {
        "authId": "abcd123",
        "email": "abcd456@def.com",
        "userId": 6
      };

      const response = await request(server)
        .post('/user/add')
        .send(body);

      expect(response.status).toEqual(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(expected);
      expect(response.body).not.toEqual({ error: "Could not add new user." });
    });

    test('missing authId returns error', async () => {
      const body = {};

      const response = await request(server)
        .post('/user/add')
        .send(body);

      expect(response.status).toEqual(400);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual({ error: "Missing authId or Email." });

    });
  }); // end user/post

}); // end user route