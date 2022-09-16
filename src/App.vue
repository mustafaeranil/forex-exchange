<template>
  <div id="app">
    <div class="flex flex-wrap items-center gap-10">
      <div class="flex flex-col gap-8">
        <SelectOption
          :value="selectedExchange"
          :options="exchangeOptions"
          :loading="exchangesLoading"
          @input="selectAnExchange"
          placeholder="Select Exchange"
          class="w-[298px]"
        />
        <SelectOption
          :value="selectedSymbolValue"
          :options="symbolOptions"
          :loading="symbolsLoading"
          :disabled="!selectedExchange"
          @input="selectASymbol"
          placeholder="Select Symbol"
          class="w-[298px]"
        />
      </div>
      <div v-if="selectedSymbolValue" class="w-full max-w-[723px]">
        <ForexChart
          :symbol="selectedSymbol"
          :chartLabels="candles.t"
          :chartData="chartData"
          :activeTab="selectedResolution"
          :tabs="resolutions"
          :currentPrice="currentPrice"
          :priceDiffText="priceDiffText"
          @tabClicked="selectAResolution"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import ForexChart from "./components/organisms/ForexChart"
import SelectOption from "./components/atoms/SelectOption"

export default {
  name: "App",
  components: { SelectOption, ForexChart },
  data() {
    return {
      selectedExchange: "",
      selectedSymbolValue: "",
      exchangesLoading: true,
      symbolsLoading: false,
      connection: null,
      selectedResolution: "15",
      dateDiffMultiplier: 1000,
      resolutions: [
        {
          id: 1,
          title: "15M",
          value: "15",
          dateDiffRatio: 25
        },
        {
          id: 2,
          title: "1H",
          value: "60",
          dateDiffRatio: 100
        },
        {
          id: 3,
          title: "1D",
          value: "D",
          dateDiffRatio: 2400
        },
        {
          id: 4,
          title: "1W",
          value: "W",
          dateDiffRatio: 16800
        },
        {
          id: 5,
          title: "1M",
          value: "M",
          dateDiffRatio: 500000
        }
      ]
    }
  },
  computed: {
    ...mapState("forex", ["candles", "symbols"]),
    ...mapGetters("forex", ["exchangeOptions", "symbolOptions"]),
    selectedSymbol() {
      return this.symbols.find(
        (symbol) => symbol.symbol == this.selectedSymbolValue
      )
    },
    chartData() {
      return [
        {
          data: this.candles.c,
          fill: true,
          borderColor: "rgb(118, 193, 0)",
          tension: 0,
          backgroundColor: "rgb(118, 193, 0,0.1)"
        }
      ]
    },
    currentPrice() {
      return this.candles.c[this.candles.c.length - 1]?.toFixed(2) || 0
    },
    lastPrice() {
      return this.candles.c[this.candles.c.length - 2]?.toFixed(2) || 0
    },
    priceDiffText() {
      const priceDiff = this.currentPrice - this.lastPrice
      const priceDiffPer =
        ((this.currentPrice - this.lastPrice) / this.lastPrice) * 100

      return `${priceDiff.toFixed(2)} (${priceDiffPer.toFixed(2)}%)`
    }
  },
  created() {
    //
    this.fetchExchanges().finally(() => (this.exchangesLoading = false))
  },
  methods: {
    ...mapActions("forex", [
      "fetchExchanges",
      "fetchSymbols",
      "fetchCandles",
      "addACandleToHistory",
      "updateLastCandle"
    ]),
    fetchChartData(newSocketReq = false) {
      const symbol = this.selectedSymbolValue
      const resolution = this.selectedResolution
      const dateDiff =
        this.resolutions.find((r) => r.value == resolution).dateDiffRatio *
        this.dateDiffMultiplier
      const to = new Date().getTime()
      const from = to - dateDiff

      this.fetchCandles({
        symbol,
        resolution,
        to,
        from
      }).then(() => {
        // add a candle for current price
        // use last candle for placeholding
        this.addACandleToHistory({
          c: this.candles.c[this.candles.c.length - 1],
          t: this.candles.c[this.candles.t.length - 1]
        })

        // open socket connection for live price update
        if (newSocketReq) this.openRealTimeConnection()
      })
    },
    openRealTimeConnection() {
      // close former connection
      this.connection?.close()

      this.connection = new WebSocket(
        `wss://ws.finnhub.io?token=${process.env.VUE_APP_KEY}`
      )

      this.connection.onopen = () => {
        this.connection.send(
          `{"type":"subscribe","symbol":"${this.selectedSymbolValue}"}`
        )
      }

      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data)

        // ping check
        if (data.type == "ping") return

        // update last candle
        // using c(close price) for display candle on the chart
        // so should update c with p(price)
        this.updateLastCandle({
          c: data.data[0].p,
          t: data.data[0].t
        })
      }
    },
    selectAnExchange(exchange) {
      if (exchange == this.selectedExchange) return

      this.selectedExchange = exchange
      this.symbolsLoading = true

      this.fetchSymbols(exchange).finally(() => (this.symbolsLoading = false))
    },
    selectASymbol(symbol) {
      if (symbol == this.selectedSymbolValue) return

      this.selectedSymbolValue = symbol

      // fetch chart data
      // new socket connection required
      this.fetchChartData(true)
    },
    selectAResolution(resolution) {
      if (resolution == this.selectedResolution) return

      this.selectedResolution = resolution

      // fetch chart data
      // new socket connection is not required
      this.fetchChartData()
    }
  }
}
</script>
