<template>
  <transition leave-to-class="opacity-0" enter-class="opacity-0">
    <div
      class="loading"
      style="backdrop-filter: blur(5px); background: rgba(255, 255, 255, 0.1)"
    >
      <div class="loading__spin" style="border-right-color: transparent"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoadingSpin"
}
</script>

<style lang="postcss" scoped>
.loading {
  @apply pointer-events-none absolute flex h-full w-full flex-col items-center justify-center gap-2 text-center transition-opacity;

  &__spin {
    @apply h-6 w-6 animate-spin rounded-full border-4 border-blue-400;
  }
}
</style>
