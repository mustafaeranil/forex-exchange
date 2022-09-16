<template>
  <canvas ref="lineChart"></canvas>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler
} from "chart.js"

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler
)

export default {
  name: "LineChart",
  props: {
    labels: Array,
    datasets: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    datasets: {
      handler(newDatasets) {
        this.chart.data.datasets = newDatasets
        this.chart.data.labels = this.labels
        this.chart.update()
      },
      deep: true
    }
  },
  mounted() {
    this.chart = new Chart(this.$refs.lineChart, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    })
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>
