// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
