import Vue from 'vue'
Vue.directive('fixed', {
  bind: (el, binding) => {
    window.onscroll = () => {
      let srcollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (srcollTop > binding.value) {
        el.style.position = 'fixed'
        el.style.top = '30px'
      } else {
        el.style.position = 'relative'
        el.style.top = '0'
      }
    }
  }
})
