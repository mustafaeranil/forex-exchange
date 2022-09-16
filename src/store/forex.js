import { api } from "@/api"

export default {
  state: {
    exchanges: [],
    symbols: [],
    candles: {
      c: [],
      h: [],
      l: [],
      o: [],
      t: [],
      v: []
    }
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
            commit("updateCandles", res.data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    addACandleToHistory({ state, commit }, candle) {
      const newCandles = { ...state.candles }

      // remove first candle for saving length of history
      Object.keys(newCandles).forEach((key) => {
        // avoid status property by checking is it an array
        if (Array.isArray(newCandles[key])) {
          newCandles[key].shift()
        }
      })

      // add new candle
      Object.entries(candle).forEach(([key, val]) => {
        newCandles[key].push(val)
      })

      commit("updateCandles", newCandles)
    },
    updateLastCandle({ state, commit }, candle) {
      const newCandles = { ...state.candles }

      Object.entries(candle).forEach(([key, val]) => {
        newCandles[key][newCandles[key].length - 1] = val
      })

      commit("updateCandles", newCandles)
    }
  },
  namespaced: true
}
