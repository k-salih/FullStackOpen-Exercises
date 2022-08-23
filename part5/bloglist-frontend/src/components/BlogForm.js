import {useState} from 'react'
import {useEffect} from 'react'
import Notification from './Notification'
import BlogService from '../services/blogs'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)


    const handleSubmit = (event) => {
        event.preventDefault()
        const blogObject = {
            title,
            author,
            url
        }
        BlogService.create(blogObject)
            .then(returnedBlog => {
                setTitle('')
                setAuthor('')
                setUrl('')
                setMessage(<Notification message={`a new blog ${title} by ${author} added`} negative={false} />)
                setTimeout(() => {
                    setMessage(null)
                } , 5000)
            })
            .catch(error => {
                setMessage(<Notification message={error.response.data.error} negative={true} />)
                setTimeout(() => {
                    setMessage(null)
                } , 5000)
            } )
    }

    return (
        <div>
            {message}
            <h2>Create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input value={title} onChange={({ target }) => setTitle(target.value)} />
                    author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                    url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
