
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
    title: 'HTML is easy',
    author: "Tek",
    url: "url1",
    likes: 0,
    },
    {
    title: 'CSS is easy',
    author: "Salih",
    url: "url2",
    likes: 0,
    }
]

const initialUsers = [
    {
      username:'salihonya',
      name: "Salih",
      passwordHash: "sah",
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

module.exports = {
    initialBlogs, blogsInDb,
    initialUsers, usersInDb
  }