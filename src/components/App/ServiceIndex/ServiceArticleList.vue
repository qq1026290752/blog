<template>
    <div class="index_article clearfix">
        <div class="article_list fl">
            <div class="article_list_title">
                <h3>文章列表</h3>
            </div>        
            <div class="article_list_body">
                <article class="excerpt clearfix mdl-shadow" v-for="item in articleList" :key="item.articleId" >
                    <div class="focus"> 
                        <router-link :to="{ name: 'article', params: { id:item.articleId }}"  class="thumbnail">
                            <img :src= "item.articleImageUrl" :alt="item.articleTitle" scale="0" class="articleImage">
                        </router-link>
                    </div>
                    <header>
                        <h2>
                            <router-link :to="{ name: 'article', params: { id:item.articleId }}">{{item.articleTitle}}</router-link>
                        </h2>
                    </header>
                    <div class="article_message">
                        <span class="iconfont icon-denglu"></span><router-link to="/s" class="user_href">{{item.userName}}</router-link>
                        <span class="iconfont icon-shijian"></span><span class="user_time">{{item.createTime|DateFormatter}}</span>
                        <span class="iconfont icon-a851"></span><span class="user_time">{{item.clicks}}浏览</span>
                        <span class="iconfont icon-pinglun"></span><router-link to="/s" class="user_href">0评论</router-link>
                    </div>
                    <p class="article_note" v-text="item.label">
                    </p>
                </article> 
                <div class="pagination_page">   
                   <el-pagination 
                     @current-change = "handleSizeChange"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                    </el-pagination>
                </div>
               
            </div>
        </div> 
    </div>
</template>
<script>
import {Pagination} from '../../../moduls/Modul' 
export default {
    data(){
        return{ 
            articleList:[],
            startPags:0,
            pageSize:5,
            total:0
        }
    },
    created(){
        this.getAticleListIndex();
    },
    methods:{
        getAticleListIndex(){
            let page = new Pagination(this.startPags,this.pageSize);
            this.$http.post(servicePath +'article/getAticleListIndex',page).then(function(response){ 
                if (response.body.message) { 
                    this.articleList = response.body.data; 
                    this.total = response.body.total;
                }   
            },function(response){		
                this.$message.error('抱歉!程序出现错误!请联系管理员');
            });
        },
        handleSizeChange(value){
            this.startPags = value;
            this.getAticleListIndex();
        }
    },
}
</script>
<style>
.index_article{
    width: 100%;
    overflow: hidden;
    display: fix;
}

.article_list{
    width: 100%; 
}
.article_list_body{ 
    min-height: 800px;
}
.article_list_body .excerpt{ 
    padding: 20px 20px 20px 256px;
    margin-bottom: 1px;
    position: relative;
    border-left: solid 8px #ffffff;
    margin-bottom: 20px;
    background-color: #fff;
}
.article_list_body .excerpt .focus {
    float: left;
    width: 220px;
    margin-left: -240px;
    text-align: center;
    position: relative;
    overflow: hidden;
    display: table;
}
.excerpt .focus a {
    display: table-cell;
    vertical-align: middle;
    width: 220px;
    height: 150px;
}
.excerpt header{
     margin: 0 40px 15px 0;
}

.excerpt h2{
    display: inline;
    font-size: 20px;
    margin: 0;
    font-weight: normal;
    position: relative;
    top: 1px;
    line-height: 25px;
}
.excerpt h2 a{
    color: #428BD1;
    text-decoration: none;
}
.article_list_body .excerpt:hover{
    border-left: solid 8px #428bca;
    padding-left: 260px;
    margin-left: -4px;
    background-color: #F8FCFE;
}
.article_message {
    height: 20px; 
    font-size: 12px;
    font-weight: normal;
    margin-bottom: 7px;
}
.article_message .user_href{
    margin-left:5px; 
    text-decoration: none;
    margin-right: 25px; 
    line-height: 20px;
    display: inline;
    color:#337ab7
}
.article_message span{
    display: inline-block;
    height: 20px;
    line-height: 20px;
}
.article_message .user_time{
     display: inline-block;
     margin-left:5px; 
     color: #555;
     font-weight: normal;
     margin-right: 25px;
}
.iconfont{
    font-size: 14px;
}
.excerpt .article_note{
    margin-top: 8px;
    color: #777;
    font-size: 14px;
    line-height: 24px;  
}
.focus .articleImage{
    width: 150px;
    height: 130px;
}
.pagination_page{
    text-align: center;
    margin-top: 25px;
}
</style>
