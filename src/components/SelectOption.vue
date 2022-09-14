<template>
  <div class="select-option" v-click-outside="closeDropdown">
    <div class="select-option__selected" @click="dropdown = !dropdown">
      {{ valueTitle }}
    </div>
    <Icon name="chevron-down-solid" class="select-option__icon" />
    <div class="select-option__options" v-show="dropdown && options.length > 0">
      <div
        class="select-option__option"
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option.value)"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon"

export default {
  name: "SelectOption",
  props: {
    value: {
      default: "",
      type: [String, Number]
    },
    options: {
      default: () => [],
      type: Array
    },
    placeholder: {
      default: "Select an option",
      type: String
    }
  },
  components: {
    Icon
  },
  data() {
    return {
      dropdown: false
    }
  },
  computed: {
    selectedOption() {
      return this.options.find((o) => o.value == this.value)
    },
    valueTitle() {
      return this.selectedOption?.title ?? this.placeholder
    }
  },
  methods: {
    selectOption(value) {
      this.$emit("input", value)
    },
    closeDropdown() {
      this.dropdown = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.select-option {
  @apply relative rounded-md border-2;

  &__selected {
    @apply cursor-pointer py-3 pl-4 pr-7 text-lg;
  }

  &__icon {
    @apply pointer-events-none absolute inset-y-0 right-4 my-auto h-3.5 w-3.5;
  }

  &__options {
    @apply absolute top-full left-0 flex min-w-full flex-col rounded-md border-2;
  }

  &__option {
    @apply cursor-pointer border-b px-4 py-2 hover:bg-gray-100;
  }
}
</style>
