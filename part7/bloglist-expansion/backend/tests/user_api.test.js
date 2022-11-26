const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

test("a valid user can be added", async () => {
  const newUser = {
    username: "Test user",
    name: "Test name",
    password: "Test password",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1);

  const usernames = usersAtEnd.map((n) => n.username);
  expect(usernames).toContain("Test user");
}, 500000);

test("if the password is less than 3 characters, the user cannot be added", async () => {
  const newUser = {
    username: "Test user2",
    name: "Test name2",
    password: "Te",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(helper.initialUsers.length);
}, 500000);

test("if the username is less than 3 characters, the user cannot be added", async () => {
  const newUser = {
    username: "Te",
    name: "Test name2",
    password: "Test password",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(helper.initialUsers.length);
}, 500000);

test("if the username is missing, the user cannot be added", async () => {
  const newUser = {
    name: "Test name2",
    password: "Test password",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(helper.initialUsers.length);
}, 500000);

test("if the username is not unique, the user cannot be added", async () => {
  const newUser = {
    username: "salihonya",
    name: "salih",
    password: "Test",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(helper.initialUsers.length);
}, 500000);

test("if the password is missing, the user cannot be added", async () => {
  const newUser = {
    username: "Test user2",
    name: "Test name2",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd.length).toBe(helper.initialUsers.length);
}, 500000);

afterAll(() => {
  mongoose.connection.close();
});
