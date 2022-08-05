
const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

module.exports = {
    initialBlogs, blogsInDb
  }