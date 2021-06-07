process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async() => {
    const result = await db.query(`INSERT INTO users (name, type) VALUES ('Peanut', 'admin') RETURNING id, name, type`);
    testUser = result.rows[0];
})
afterEach(async() => {
    await db.query('DELETE FROM users *');
})
afterAll(async() => {
    await db.end();
})


describe("HOPE THIS WORKS", () => {
    test("BLAH", () => {
        console.log(testUser);
        expect(1).toBe(1); // just because it wants an expect statement
    })
    test("get a list of users", async ()=>{
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({users : [testUser]})
    })
    test("get a user", async ()=>{
        const res = await request(app).get(`/users/${testUser.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({user : testUser})
    })
    test("get a user not exist", async ()=>{
        const res = await request(app).get(`/users/0`);
        expect(res.statusCode).toBe(404);
    })
})
