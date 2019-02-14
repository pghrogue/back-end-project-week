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

describe('the /note routes', () => {
  test('the default route returns OK', async () => {
    const response = await request(server).get('/note');

    expect(response.status).toEqual(200);
  });

  describe('GET /note/get', () => {
    test('/note/get/all returns an object list', async () => {
      const response = await request(server).get('/note/get/all');
  
      expect(response.status).toEqual(200);
      expect(response.type).toBe('application/json');
      expect(response.body).not.toEqual({ error: "Note information could not be retrieved." });
    });
  
    test('/note/get/id returns a note', async () => {
      const response = await request(server).get('/note/get/1');
  
      expect(response.status).toEqual(200);
      expect(response.type).toBe('application/json');
      expect(response.body).not.toEqual({ error: `Note 1 could not be found.` });
    });  
  }); // End of /note/get

  describe('POST /note/create', () => {
    afterEach( async () => {
      await db.seed.run();
    });
    
    test('creates a note', async () => {
      
      const body = { title: "test", textBody: "test body" };
  
      const response = await request(server)
        .post('/note/create')
        .send(body);
  
      expect(response.body).toEqual([4]);
      expect(response.type).toBe('application/json');
      expect(response.body).not.toEqual({ error: "Could not post new note." });
    });

    test('missing title returns an error', async () => {
      const body = { textBody: "test body" };

      const response = await request(server)
        .post('/note/create')
        .send(body);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({error: "Please provide title and body of the note."});
    });

  }); // End of /note/create

  describe('PUT /note/edit/id', () => {
    test('it errors if note is not found', async () => {});

    test('missing body returns an error', async () => {});

    it('edits an existing note', async () => {});
  }); // End of /note/edit

  describe('DELETE /note/delete/id', () => {
    it('deletes a note', async () => {});

    it('cannot delete a missing note', async () => {});
  }); // End of /note/delete

}); // End of /note routes