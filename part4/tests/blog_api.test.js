const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = require('jsonwebtoken')



const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

  })

test('correct number of blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
},500000)

test('a valid blog can be added', async () => {
    const user = {
        username: 'test user2',
        name: 'Test User',
        password: 'test password'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const token = await helper.getToken(user.username, user.password)

    const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://www.test.com',
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('Test blog')
} ,500000)



test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
} ,500000)

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const user = {
        username: 'test user',
        name: 'Test User',
        password: 'test password'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const token = await helper.getToken(user.username, user.password)

    const newBlog = {
        title: 'Testblog2',
        author: 'Test author2',
        url: 'www.test2.com'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes[helper.initialBlogs.length]).toBe(0)
} ,500000)

test('if the title and url properties are missing from the request data, status code 400', async () => {
    const user = {
        username: 'test user2',
        name: 'Test User',
        password: 'test password'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const token = await helper.getToken(user.username, user.password)

    const newBlog = {
      author: 'Test author3',
      likes: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
} ,500000)

test('deletion of a blog post succeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const user = {
        username: 'test user2',
        name: 'Test User',
        password: 'test password'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const token = await helper.getToken(user.username, user.password)

    const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://www.test.com',
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('Test blog')

    const blogToDelete = blogsAtEnd[helper.initialBlogs.length]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
    
    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete.length).toBe(helper.initialBlogs.length)
} ,500000)

test('valid blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
        title: 'Test blog2',
        author: 'Test author2',
        url: 'www.test2.com',
        likes: 0
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('Test blog2')
} ,500000)

test('particular blog properties can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
        author: 'Test 213author2',
        likes: 21
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    authors = blogsAtEnd.map(n => n.author)
    expect(authors).toContain('Test 213author2')

} ,500000)

test('Adding a blog without a token returns status code 401', async () => {
    const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://www.test.com',
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
} ,500000)


afterAll(() => {
  mongoose.connection.close()
})