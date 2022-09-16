<template>
  <div class="rounded-flag">
    <div :class="flagClass"></div>
  </div>
</template>
<script>
export default {
  name: "RoundedFlag",
  props: {
    flag: {
      type: String,
      required: true
    }
  },
  computed: {
    flagClass() {
      return `currency-flag currency-flag-${this.flag.toLowerCase()}`
    }
  }
}
</script>

<style lang="postcss" scoped>
.rounded-flag {
  @apply relative h-8 w-8 overflow-hidden rounded-full;

  & div {
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform;
  }
}
</style>
