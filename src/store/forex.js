import { api } from "@/api"

export default {
  state: {
    exchanges: [],
    symbols: []
  },
  getters: {},
  mutations: {
    updateExchanges: (state, exchanges) => {
      state.exchanges = exchanges
    },
    updateSymbols: (state, symbols) => {
      state.symbols = symbols
    }
  },
  actions: {
    async fetchExchanges({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("/forex/exchange")
          .then((res) => {
            commit("updateExchanges", res.data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async fetchSymbols({ commit }, exchange) {
      return new Promise((resolve, reject) => {
        api
          .get(`/forex/symbol?exchange=${exchange}`)
          .then((res) => {
            commit("updateSymbols", res.data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  namespaced: true
}
