// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index';
import {Button,Input,Container,Aside,Header,Main,Footer,Message,Avatar,Menu,MenuItem,Submenu,MessageBox,Select,Option,DatePicker,Card,Table,TableColumn,Image} from 'element-ui'
import './assets/css/reset.css'
import './assets/css/index.css'

Vue.use(Button)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Avatar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Image)
Vue.config.productionTip = false

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
