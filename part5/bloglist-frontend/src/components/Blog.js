import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  
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


  return (
      <div style={blogStyle}>
          <div>
              {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
          </div>
          <div style={{ display: visible ? '' : 'none' }}>
              {blog.url} <br />
              likes {blog.likes} <button>like</button> <br />
              {blog.author}
          </div>
      </div>
  )
}

export default Blog