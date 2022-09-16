<template>
  <button :class="classList" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ChartTab",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      const classList = ["chart-tab"]

      if (this.active) classList.push("active")

      return classList
    }
  }
}
</script>

<style lang="postcss" scoped>
.chart-tab {
  @apply rounded-md py-1 px-4;

  &.active {
    @apply bg-blue-100 text-sm font-bold lg:text-base;
  }
}
</style>
