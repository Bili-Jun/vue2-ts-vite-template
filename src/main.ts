import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from '@/App.vue';
import '@/style.css'

const pinia = createPinia()

Vue.use(PiniaVuePlugin)


new Vue({
  render: (h) => h(App),
  pinia
}).$mount('#app');
