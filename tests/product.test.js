const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../server')

require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONG_URI);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /users", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

  
describe("POST /users", () => {
it("should create a user", async () => {
    const res = await request(app).post("/users").send({
    name: "user2",
    email: 'user2@gmail.com',
    phone: 9437638753,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("user2");
});
});
  
describe("PUT /users/:id", () => {
it("should update a user", async () => {
    const res = await request(app)
    .put("/users/642cf583279e18424dd574ea")
    .send({
        name: "Vivek p",
        email: 'vivek@gmail.com',
        phone: 9843583473,
    });
    expect(res.statusCode).toBe(200);
});
});
  
describe("DELETE /users/:id", () => {
it("should delete a user", async () => {
    const res = await request(app).delete(
    "/users/642cf76babd622cec391e653"
    );
    expect(res.statusCode).toBe(200);
});
});  