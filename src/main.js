import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import vueResource from "vue-resource"
import mavonEditor from 'mavon-editor'  
import 'mavon-editor/dist/css/index.css'
import '../static/css/site.css' 
import "../static/css/eleme_uplode.css" 
import "../static/highlightJs/styles/importHighligh.css" ; 
import '../static/css/code-style.css' 

/*定义全局变量*/
//定义服务器host
global.servicePath = 'http://ws.28ph.cn/'; 
global.HostPath = 'ws.28ph.cn';
import {router} from './router/router'
import'./element/element'

Vue.use(Vuex) 
Vue.use(mavonEditor) 
Vue.use(vueResource)
 
const  vuex_store = new Vuex.Store({
  state:{
      user_name:"",
      user:{}
  } 
})
new Vue({ 
  router,
  store:vuex_store, //注入到vue
  render: h => h(App)
}).$mount('#app')
//时间组件
import {formatDate} from './utils/utils'
//全局过滤器
Vue.filter("DateFormatter",function(value){
  return  formatDate(new Date(value), 'yyyy年MM月dd日');
});