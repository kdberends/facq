import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.use(Vue2TouchEvents, {
    disableClick: true,
    touchClass: 'touchActive',
    tapTolerance: 10,
    touchHoldTolerance: 400,
    swipeTolerance: 30,
    longTapTimeInterval: 400
})

Vue.config.productionTip = false

var WebFont = require('webfontloader');

WebFont.load({
google: {
  families: ['Ubuntu', 'Commissioner']
}
});

new Vue({
  render: h => h(App),
}).$mount('#app')
