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

  test('/note/get/all returns an object list', () => {});
});