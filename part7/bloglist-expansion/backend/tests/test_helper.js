const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Tek",
    url: "url1",
    likes: 0,
  },
  {
    title: "CSS is easy",
    author: "Salih",
    url: "url2",
    likes: 0,
  },
];

const initialUsers = [
  {
    username: "salihonya",
    name: "Salih",
    password: "sah",
  },
];

const blogsInDb = async () => {
  const blogs = await await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getToken = async (username, password) => {
  const user = {
    username,
    password,
  };
  const response = await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  return response.body.token;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
  getToken,
};
