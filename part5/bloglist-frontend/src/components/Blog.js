import { useState } from "react"
import BlogService from "../services/blogs"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  
  const toggleVisibility = () => {
      setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px',
    cursor: 'pointer'
    }

  const likeHandler = async () => {
    setLikes(likes + 1)

    const updatedBlog = {
      ...blog,
      likes: likes
    }

    const response = await BlogService.update(blog.id, updatedBlog)
  }

  const deleteHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const response = await BlogService.remove(blog.id)
    }
    }


  return (
      <div style={blogStyle}>
          <div>
              {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
          </div>
          <div style={{ display: visible ? '' : 'none' }}>
              {blog.url} <br />
              likes {likes} <button onClick={likeHandler}>like</button> <br />
              {blog.author} <br />
              <button style={deleteStyle} onClick={deleteHandler}>remove</button>
          </div>
      </div>
  )
}

export default Blog