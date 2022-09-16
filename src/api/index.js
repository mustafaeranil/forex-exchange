import axios from "axios"

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL
})

// X-Finnhub-Token causing cors error in the header
// so key added as a query parameter

api.interceptors.request.use(
  (config) => {
    config.params = { ...config.params, token: process.env.VUE_APP_SANDBOX_KEY }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
