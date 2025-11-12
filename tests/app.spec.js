import request from 'supertest';
import { createServer } from '../src/app.js';

//  should export a function that returns an app (see later)
let server;

beforeAll(async () => {
  const { app, close } = await createServer();
  server = app;
});

afterAll(async () => {
  // if createServer returned a close function, call it
  if (server && server.close) {
    try { server.close(); } catch(e) {}
  }
});

test('GET / returns ok JSON', async () => {
  const res = await request(server).get('/');
  expect(res.status).toBe(200);
  expect(res.body).toEqual(expect.objectContaining({ ok: true }));
});
