import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: `bearer ${user.token}` },
  });
  return response.data;
};

const update = async (id, newBlog) => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, {
    headers: { Authorization: `bearer ${user.token}` },
  });
  return response.data;
};

const remove = async (id) => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${user.token}` },
  });
  return response.data;
};

// eslint-disable-next-line
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
// eslint-disable-next-line
export default { getAll, create, update, remove, setToken };
