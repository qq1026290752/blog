import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)
const Login = resolve => require.ensure([],()=> resolve(require('../components/Login/Login.vue')),'Login');
const Register  = resolve => require.ensure([],()=> resolve(require('../components/register/register.vue')),'Register');
const Home  = resolve => require.ensure([],()=> resolve(require('../components/App/Admin/Home.vue')),'Home');
const Index  = resolve => require.ensure([],()=> resolve(require('../components/App/Admin/index/index.vue')),'Index');
const userList  = resolve => require.ensure([],()=> resolve(require('../components/App/Admin/User/User.vue')),'userList');
const Article  = resolve => require.ensure([],()=> resolve(require('../components/App/Admin/Article/Article.vue')),'Article');
const ArticleList  = resolve => require.ensure([],()=> resolve(require('../components/App/Admin/Article/ArticleList.vue')),'ArticleList');
const ArticleCatalogue  = resolve => require.ensure([],()=> resolve(require('../components/App/Admin/Article/ArticleCatalogue.vue')),'ArticleCatalogue');
const ServiceIndex  = resolve => require.ensure([],()=> resolve(require('../components/App/ServiceIndex/ServiceIndex.vue')),'ServiceIndex');
const ServiceArticleList  = resolve => require.ensure([],()=> resolve(require('../components/App/ServiceIndex/ServiceArticleList.vue')),'ServiceArticleList');
const ServiceItems  = resolve => require.ensure([],()=> resolve(require('../components/App/ServiceIndex/ServiceArticleItem.vue')),'ServiceItems');
const WxButtonList  = resolve => require.ensure([],()=> resolve(require('../components/App/wx/wxButtonList.vue')),'WxButtonList');
/*开始定义路由*/
export const router = new VueRouter({ 
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