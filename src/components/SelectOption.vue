<template>
  <div :class="classList" v-click-outside="closeDropdown">
    <LoadingSpin v-show="loading" />
    <div class="select-option__selected" @click="dropdown = !dropdown">
      {{ valueTitle }}
    </div>
    <Icon name="chevron-down-solid" class="select-option__icon" />
    <div
      class="select-option__options"
      v-show="dropdown && options.length > 0 && !loading"
    >
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
import LoadingSpin from "./LoadingSpin"

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
    },
    disabled: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  components: {
    Icon,
    LoadingSpin
  },
  data() {
    return {
      dropdown: false
    }
  },
  computed: {
    classList() {
      let classList = ["select-option"]

      if (this.disabled) classList.push("select-option--disabled")
      if (this.loading) classList.push("select-option--loading")

      return classList
    },
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
      this.closeDropdown()
    },
    closeDropdown() {
      this.dropdown = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.select-option {
  @apply relative rounded-lg border-2 border-gray-300;

  &--loading {
    @apply pointer-events-none overflow-hidden;
  }

  &--disabled {
    @apply pointer-events-none overflow-hidden border-gray-200 bg-gray-200 opacity-50;
  }

  &__selected {
    @apply cursor-pointer py-3.5 pl-4 pr-7 tracking-wide text-gray-700;
  }

  &__icon {
    @apply pointer-events-none absolute inset-y-0 right-4 my-auto h-3.5 w-3.5 text-gray-400;
  }

  &__options {
    @apply absolute top-full left-0 z-10 flex min-w-full flex-col rounded-lg border-2 border-gray-300 bg-white;
  }

  &__option {
    @apply cursor-pointer border-b px-4 py-2 hover:bg-gray-100;
  }
}
</style>
