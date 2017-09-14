import Vue from 'vue'
import Vuex from 'vuex';
import ElementUI from 'element-ui'
import VueRouter from "vue-router"
import App from './App.vue'
import vueResource from "vue-resource"
import mavonEditor from 'mavon-editor'  
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-default/index.css'
import '../static/css/site.css' 
import "../static/css/eleme_uplode.css"
//定义服务器host
global.servicePath = 'http://ws.28ph.cn/'; 
global.HostPath = 'ws.28ph.cn';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'  
import "../static/highlightJs/styles/importHighligh.css" ;
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
import '../static/css/code-style.css' 
Vue.use(Vuex)
Vue.use(vueResource);
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(mavonEditor)  
Vue.http.options.emulateJSON = false;
/*定义全局变量*/
const Login = resolve => require.ensure([],()=> resolve(require('./components/Login/Login.vue')),'Login');
const Register  = resolve => require.ensure([],()=> resolve(require('./components/register/register.vue')),'Register');
const Home  = resolve => require.ensure([],()=> resolve(require('./components/App/Admin/Home.vue')),'Home');
const Index  = resolve => require.ensure([],()=> resolve(require('./components/App/Admin/index/index.vue')),'Index');
const userList  = resolve => require.ensure([],()=> resolve(require('./components/App/Admin/User/User.vue')),'userList');
const Article  = resolve => require.ensure([],()=> resolve(require('./components/App/Admin/Article/Article.vue')),'Article');
const ArticleList  = resolve => require.ensure([],()=> resolve(require('./components/App/Admin/Article/ArticleList.vue')),'ArticleList');
const ArticleCatalogue  = resolve => require.ensure([],()=> resolve(require('./components/App/Admin/Article/ArticleCatalogue.vue')),'ArticleCatalogue');
const ServiceIndex  = resolve => require.ensure([],()=> resolve(require('./components/App/ServiceIndex/ServiceIndex.vue')),'ServiceIndex');
const ServiceArticleList  = resolve => require.ensure([],()=> resolve(require('./components/App/ServiceIndex/ServiceArticleList.vue')),'ServiceArticleList');
const ServiceItems  = resolve => require.ensure([],()=> resolve(require('./components/App/ServiceIndex/ServiceArticleItem.vue')),'ServiceItems');
const WxButtonList  = resolve => require.ensure([],()=> resolve(require('./components/App/wx/wxButtonList.vue')),'WxButtonList');
//时间组件
import {formatDate} from './utils/utils'
/*开始定义路由*/
var router = new VueRouter({
  history: true,
  routes: [ 
    { name:'Login',path:'/Login', component:Login},
    { name:'Register', path:'/Register', component:Register},
    { name:'Home', path:'/Home', component:Home,children: [
        {path: '/admin/Index',component: Index},
        {path: '/admin/userList', component: userList},
        {path: '/admin/article', component: Article},
        {path:'/admin/ArticleList',component: ArticleList},
        {path: '/admin/editArticle/:articleId',component: Article},
        {path:'/admin/catalogue',component:ArticleCatalogue},
        {path:'/admin/wxButton',component:WxButtonList}
    ]},
    { name:'index',path:'',component:ServiceIndex,children:[ 
      {path:'',component:ServiceArticleList},
      {name:"article",path:'/article/:id',component:ServiceItems}      
    ]} 
  ]
})
const  vuex_store = new Vuex.Store({
    state:{
        user_name:"",
        user:{}
    } 
})


new Vue({
  el: '#app',
  router,
  store:vuex_store, //注入到vue
  render: h => h(App)

})
//全局过滤器
Vue.filter("DateFormatter",function(value){
  return  formatDate(new Date(value), 'yyyy年MM月dd日');
});