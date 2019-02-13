const request = require('supertest');
const server = require('./server.js');


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
});