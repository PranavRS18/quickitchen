import Vue from 'vue'
import QuicKitchen from './QuicKitchen.vue'

export const searchBus = new Vue()

new Vue({
  el: '#QuicKitchen',
  render: h => h(QuicKitchen)
})
