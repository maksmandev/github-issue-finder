import { message } from 'antd'
import axios from 'axios'

const { REACT_APP_GITHUB_ACCESS_TOKEN, REACT_APP_GITHUB_USERNAME } = process.env

const token = `Basic ${btoa(
  `${REACT_APP_GITHUB_USERNAME}:${REACT_APP_GITHUB_ACCESS_TOKEN}`
)}`

const api = axios.create({
  baseURL: 'https://api.github.com/repos/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: token,
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.status.message === 500) {
      message.error('Oops, something went wrong!')
    }
    return Promise.reject(error.response)
  }
)

export default api
