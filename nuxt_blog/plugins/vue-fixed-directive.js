import Vue from 'vue'
Vue.directive('fixed', {
  bind: (el) => {
    window.onscroll = () => {
      let srcollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (srcollTop > 130) {
        el.style.position = 'fixed'
        el.style.top = '30px'
      } else {
        el.style.position = 'relative'
        el.style.top = '0'
      }
    }
  }
})
