const supertest = require('supertest');

const { app, server } = require('../api/index');
const api = supertest(app);

test('validate test', async () =>{
    await api.get('/api/user')
    .expect(200)
    .expect('Content-Type', /application\/json/);
})

afterAll(() => {
    server.close();
})
