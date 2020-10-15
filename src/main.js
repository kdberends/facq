import Vue from 'vue'
import App from './App.vue'


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
