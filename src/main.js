import ons from 'onsenui';
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import firebase from 'firebase';
import store from './store'
import Vuetify from 'vuetify'

// Onsen UI Styling and Icons
require('onsenui/css-components-src/src/onsen-css-components.css');
require('onsenui/css/onsenui.css');

import App from './App.vue';

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}

Vue.use(VueOnsen);
Vue.use(Vuetify)

new Vue({
  store,
  el: '#app',
  template: '<app></app>',
  components: { App }
});

store.dispatch("init");