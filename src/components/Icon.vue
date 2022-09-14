<template>
  <inline-svg :src="dynamicIcon"></inline-svg>
</template>
<script>
import InlineSvg from "vue-inline-svg"

export default {
  name: "svgIcon",
  components: {
    InlineSvg
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    dynamicIcon() {
      return require(`@/assets/icons/${this.name}.svg`)
    }
  }
}
</script>

<style></style>
