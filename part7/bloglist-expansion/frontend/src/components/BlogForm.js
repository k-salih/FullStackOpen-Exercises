import { useState } from "react";
import Notification from "./Notification";
import BlogService from "../services/blogs";
import PropTypes from "prop-types";

const BlogForm = ({ toggle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    BlogService.create(blogObject)
      .then((returnedBlog) => {
        setTitle("");
        setAuthor("");
        setUrl("");
        setMessage(
          <Notification
            message={`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`}
            negative={false}
          />
        );
        setTimeout(() => {
          setMessage(null);
          toggle();
        }, 5000);
      })
      .catch((error) => {
        setMessage(
          <Notification message={error.response.data.error} negative={true} />
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      {message}
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:{" "}
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          author:{" "}
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          url:{" "}
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default BlogForm;
