const request = require('supertest');
const server = require('../api/server');

const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.testing);

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
  
      expect(response.body).toEqual({success: [4]});
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
    test('it errors if note is not found', async () => {
      const body = { title: "editted", textBody: "body edit" };

      const response = await request(server)
        .put('/note/edit/5')
        .send(body);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({error: "Note not found."});
    });

    test('missing body returns an error', async () => {
      const body = { title: "editted" };

      const response = await request(server)
        .put('/note/edit/1')
        .send(body);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({error: "Please provide the title and the body."});
    });

    it('edits an existing note', async () => {
      const body = { title: "editted", textBody: "editted body" };
      const expected = {
        "noteId": 1,
        "textBody": "editted body",
        "title": "editted",
        "userId": 1,
        "groupId": null
      };

      const response = await request(server)
        .put('/note/edit/1')
        .send(body);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected);
    });
  }); // End of /note/edit

  describe('DELETE /note/delete/id', () => {
    it('deletes a note', async () => {
      const response = await request(server)
        .delete('/note/delete/3');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({success: "Note successfully deleted"});
    });

  }); // End of /note/delete

}); // End of /note routes