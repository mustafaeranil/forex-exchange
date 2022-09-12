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
    }
  },
  namespaced: true
}
