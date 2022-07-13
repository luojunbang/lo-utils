import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:7001',
  timeout: 10 * 1000,
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
  }
)

instance.interceptors.response.use(
  res => {
    if (res.config.headers.responseType === 'arraybuffer') {
      if (res.status === 200) return Promise.resolve(res)
    }
    return Promise.resolve(res)
  },
  error => {
    console.log(error)
  }
)

export default instance
