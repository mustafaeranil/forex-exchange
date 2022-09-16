<template>
  <div class="forex-chart">
    <div class="forex-chart__head">
      <div class="mb-2 flex items-center gap-2" v-if="symbolCurrencyArr.length">
        <RoundedFlag :flag="symbolCurrencyArr[0]" />
        <RoundedFlag :flag="symbolCurrencyArr[1]" />
        <div
          class="rounded-full bg-gray-100 px-5 py-1.5 text-sm font-bold text-gray-500"
        >
          Forex.com
        </div>
      </div>
      <div class="forex-chart__info">
        <div class="forex-chart__symbol">
          {{ symbol.displaySymbol }}
        </div>
        <div class="forex-chart__prices">
          <div class="forex-chart__price">
            {{ currentPrice }}
          </div>
          <div class="forex-chart__price-diff">
            {{ priceDiffText }}
          </div>
        </div>
      </div>
    </div>
    <div class="forex-chart__chart">
      <LineChart
        :labels="chartLabels"
        :datasets="chartData"
        :options="chartOptions"
      />
    </div>
    <div v-if="tabs.length" class="forex-chart__tabs">
      <ChartTab
        v-for="tab in tabs"
        :key="tab.id"
        :active="activeTab == tab.value"
        @click="$emit('tabClicked', tab.value)"
      >
        {{ tab.title }}
      </ChartTab>
    </div>
  </div>
</template>
<script>
import RoundedFlag from "@/components/atoms/RoundedFlag.vue"
import ChartTab from "@/components/atoms/ChartTab.vue"
import LineChart from "@/components/molecules/LineChart.vue"

export default {
  name: "ForexChart",
  components: { RoundedFlag, ChartTab, LineChart },
  props: {
    symbol: {
      type: Object
    },
    chartLabels: Array,
    chartData: {
      type: Array,
      required: true
    },
    tabs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      default: ""
    },
    currentPrice: {
      type: [Number, String],
      default: 0
    },
    priceDiffText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chartOptions: {
        animation: false,
        aspectRatio: 1 | 3,
        pointBorderWidth: 0,
        borderWidth: 2,
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
              drawOnChartArea: false,
              drawTicks: false
            },
            ticks: {
              display: false
            }
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
              drawOnChartArea: false,
              drawTicks: false
            },
            ticks: {
              display: false
            }
          }
        }
      }
    }
  },
  computed: {
    symbolCurrencyArr() {
      return this.symbol.displaySymbol.split("/")
    }
  }
}
</script>

<style lang="postcss" scoped>
.forex-chart {
  @apply relative h-full w-full rounded-xl py-5 shadow-lg;

  &__head {
    @apply flex w-full flex-col py-4 px-4 lg:px-8;
  }

  &__chart {
    @apply mb-2;
  }

  &__info {
    @apply flex w-full flex-col justify-between lg:flex-row;
  }

  &__symbol {
    @apply text-3xl font-bold;
  }

  &__price {
    @apply mb-2 text-3xl lg:text-right;
  }

  &__price-diff {
    @apply mb-2 text-lg font-bold text-[#00cb8f] lg:text-right;
  }

  &__tabs {
    @apply flex flex-wrap items-center justify-center gap-5 lg:gap-10;
  }
}
</style>
