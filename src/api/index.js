import axios from "axios"

const api = axios.create({
  baseURL: "https://finnhub.io/api/v1/"
})

//X-Finnhub-Token in the header causing cors error

api.interceptors.request.use(
  (config) => {
    //TODO: get api key from env
    config.params = { ...config.params, token: "ccfgtpiad3i1hjpur9ag" }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
