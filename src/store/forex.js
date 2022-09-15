import { api } from "@/api"

export default {
  state: {
    exchanges: [],
    symbols: [],
    candles: []
  },
  getters: {
    exchangeOptions(state) {
      return state.exchanges.map((exchange, index) => ({
        id: index + 1,
        title: exchange,
        value: exchange
      }))
    },
    symbolOptions(state) {
      return state.symbols.map((symbol, index) => ({
        id: index + 1,
        title: symbol.displaySymbol,
        value: symbol.symbol
      }))
    }
  },
  mutations: {
    updateExchanges: (state, exchanges) => {
      state.exchanges = exchanges
    },
    updateSymbols: (state, symbols) => {
      state.symbols = symbols
    },
    updateCandles: (state, candles) => {
      state.candles = candles
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
    },
    async fetchCandles({ commit }, { symbol, resolution, from, to }) {
      return new Promise((resolve, reject) => {
        api
          .get("/forex/candle", {
            params: {
              symbol,
              resolution,
              from,
              to
            }
          })
          .then((res) => {
            //c is listing closing price of candle
            console.log(res.data.c)
            commit("updateCandles", res.data.c)
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
