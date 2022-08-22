import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: `bearer ${user.token}` }
  })
  return response.data
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, create, setToken }