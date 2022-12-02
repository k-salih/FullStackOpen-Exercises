import { useState } from "react";
import Notification from "./Notification";
import BlogService from "../services/blogs";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { notificationCreator } from "../reducers/notificationReducer";

const BlogForm = ({ toggle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

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
        dispatch(
          notificationCreator(
            `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
            5
          )
        );
        setTimeout(() => {
          notificationCreator(null, 0);
          toggle();
        }, 5000);
      })
      .catch((error) => {
        dispatch(notificationCreator(error.response.data.error, 5));
      });
  };

  return (
    <div>
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
