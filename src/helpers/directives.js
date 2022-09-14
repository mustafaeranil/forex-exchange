//it's executes given callback function when click outside
const onClickOutside = {
  inserted: (el, binding, vnode) => {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }

    document.addEventListener("click", el.clickOutsideEvent)
    document.addEventListener("touchstart", el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.removeEventListener("click", el.clickOutsideEvent)
    document.removeEventListener("touchstart", el.clickOutsideEvent)
  }
}

export { onClickOutside }
