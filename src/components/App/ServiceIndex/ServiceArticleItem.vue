<template>
    <div class="article_item">
        <div class="article_list_title mdl-shadow">
			<div class="article_item_breadcrumbs">
                你的位置: <router-link to="/">九零码农</router-link> &gt;  
                         <router-link to="/">{{article.catalogName}}</router-link> &gt; 
                        {{article.articleTitle}} 
            </div>
            <header class="article_item_header mdl-shadow" >
                <h1 class="article_item_header_title">
                    <router-link  :to="{ name: 'article', params: { id:$route.params.id }}">{{article.articleTitle}}</router-link>
                </h1>
                <p class="article_item_header_message">
                    <router-link to="/">
                       <span class="iconfont icon-mulu"></span>&nbsp;{{article.catalogName}}
                    </router-link>
                    <router-link to="/">
                       <span class="iconfont icon-renyuan"></span>&nbsp;{{article.userName}}
                    </router-link>
                    <span class="message_time">
                        <span class="iconfont icon-shijian"></span>&nbsp;{{article.createTime|DateFormatter}}
                    </span>
                    <span class="message_time">
                        <span class="iconfont icon-a851"></span>&nbsp;{{article.clicks}}浏览
                    </span>
                    <router-link to="/">
                       <span class="iconfont icon-renyuan"></span>&nbsp;{{article.discussNumber}}评论
                    </router-link>
                </p>
            </header>
            <div class="article-content-box">
                <div v-html="message_text"></div>
            </div>
		</div>
        <div class="article_item_comment mdl-shadow">
            <header>
                <p>发表评论</p>
            </header>
            <div class="form_box">
                <el-form class="form">
                    <div class="form-group">
                        <div class="input-group fronm_input">
                            <div class="input-group-addon"><span class="iconfont icon-user1"></span></div>
                            <input type="text" class="form-control" placeholder="用户昵称" v-model="comment.userName"> 
                        </div>
                        <div class="input-group fronm_input">
                            <div class="input-group-addon"><span class="iconfont icon-185078emailmailstreamline"></span></div>
                            <input type="text" class="form-control" v-model="comment.userEmail" placeholder="电子邮箱"> 
                        </div>
                        <div class="input-group fronm_input">
                            <div class="input-group-addon"><span class="iconfont icon-inter"></span></div>
                            <input type="text" class="form-control"placeholder="网站地址" v-model="comment.userUrl"> 
                        </div>
                        <div class="input-group" id="editor">
                             <mavon-editor  style="height: 200px;" @imgAdd='editorUpdataImgs' :toolbars = 'toolbars' v-model="comment.commentContent" class="editor"></mavon-editor>
                        </div>
                        <div class="form_footer">
                            <input type="button" value="提交" class="seach_submit" @click="commitComment()">
                        </div>
                    </div>
                </el-form>    
            </div>
      </div>
    </div>
</template>
<script>
    //导入评论模块
    import {Comment} from '../../../moduls/Modul'
    //导入 marked markDown 语法转为 html
    import marked from "marked"
    var renderer = new marked.Renderer();
    //导入代码高亮
    import highlightJs from 'highlight.js';
    //d代码转换
    marked.setOptions({
        highlight: (code) => highlightJs.highlightAuto(code).value
    })

    export default { 
        data(){
            return{ 
                message_text:"",
                disabled:false,
                article:{
                    articleTitle:'',
                    createTime:'',
                    clicks:0,
                    discussNumber:0,
                    userName:'',
                    catalogName:''
                },
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: false, // 下划线
                    strikethrough: false, // 中划线
                    mark: false, // 标记
                    superscript: false, // 上角标
                    subscript: false, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: false, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: false, // 表格
                    fullscreen: false, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: false, // 上一步
                    redo: false, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: false, // 左对齐
                    aligncenter: false, // 居中
                    alignright: false, // 右对齐
                    /* 2.2.1 */
                    subfield: false, // 单双栏模式
                    preview: true, // 预览
                },
                comment:{
                    userName:'',//评论人昵称
                    userEmail:'',//评论人邮箱
                    userUrl:'',//评论手机号
                    commentContent:'',//评论内容
                    commentType:1,//评论类型 1是文章评论 2是网站评论
                    articleId:this.$route.params.id,//文章ID  网站评论为0 
                }
            }
        },
        created(){
            let id = this.$route.params.id; 
            this.getArticle(id);
        },
        methods:{
            getArticle(id){
                 this.$http.jsonp(servicePath +'article/'+id).then(function(response){
			    	if (response.body.message) { 
                      this.article.articleTitle = response.body.data.articleTitle; 
                      this.article.createTime = response.body.data.createTime;
                      this.article.clicks = response.body.data.clicks;
                      this.article.discussNumber = response.body.data.discussNumber;
                      this.article.userName = response.body.data.userName;
                      this.article.catalogName = response.body.data.catalogName;
                      let highlight_code = marked(response.body.data.content)
                      this.message_text = highlight_code; 
			    	}else{
                        this.$message.error(response.body.data); 
			    	}
				},function(response){		
					this.$message.error('抱歉!程序出现错误!请联系管理员');
				});
            },
            commitComment(){ 
                const comment = new Comment(0,this.comment.userName,this.comment.userEmail,
                                            this.comment.phoneNumber,this.comment.commentContent,
                                            this.comment.commentType,this.comment.articleId);
                this.$http.post(servicePath + "comment",comment).then((response)=>{
                    console.log(response.body.data)
                    if(response.body.message){
                        this.$message.success(response.body.data);
                        this.resetComment();
                    }
                },(response)=>{
                    this.$message.error(response.body.data);
                })
            },
            resetComment(){
                this.comment.userName = '';
                this.comment.userEmail =  '';
                this.comment.phoneNumber = null;
                this.comment.commentContent = ''
            },
            editorUpdataImgs(filename,file){  
			//上传图片
                var formData = new FormData();
                formData.append('file', file,file.name);
                let config = {
                    headers:{'Content-Type':'multipart/form-data'},
                    emulateJSON:true
                }; 
                this.$http.post(servicePath +'uplode/userHead',formData,config).then(function(response){	
                    if (response.body.message) {  
                        this.$refs.editor.$img2Url(filename,response.body.data);//更改图片内文章上传地址	 
                    }else{
                        
                    }
                },function(response){		
                    this.$message.error('抱歉!图片上传失败!请来联系管理员');
                });
            }   
        }
    }
</script>
<style scoped>
a:hover{
    text-decoration: none;
    color: #20a0ff;
}
.article_item{
    width: 100%; 
    overflow: hidden;
}
.article_list_title {
    height: auto;
    overflow: hidden;  
    background-color: #fff;
}
.article_item_breadcrumbs{
    height: 35px;
    line-height: 35px;
    padding-left: 10px; 
    font-size: 12px;
    color: #333;
}
.article_item_header{
    margin-bottom: 1px;
    padding: 2px 20px 12px;
    background-color: #fbfbfb; 
    position: relative;
}
.article_item .article_item_header_title{
    font-size: 20px;
    font-weight: 500;
    height: 35px;
    line-height: 35px;
    margin: 0
}
.article_item .article_item_header_title a,.article_item .article_item_header_title a:hover{
    color: #444;
    text-decoration: none;
}
.v-note-wrapper{
    min-height: 200px;
}

.article_item_header_message a{
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    display: inline;
    color: #337ab7;
}
.article_item_header_message a:hover{
    color: #44D;
}
.article_item_header_message > *{
    margin-right: 30px;
}
.article-content-box{ 
    padding: 20px 10px 20px 10px;
    position: relative; 
}
 .article_item_comment{
    width: 100%;
    min-height: 100px; 
    background-color: #fff;
    margin-top: 20px; 
    position: relative; 
    border-top:#999; 
    margin-bottom: 10px;
}
 .article_item_comment header p{
     overflow: hidden;
    padding: 12px 20px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #eee;
 }
 .article_item_comment .form_box{
    padding: 20px;
 }
.fronm_input{
    width: 30%;
}

.article_item_comment .form_box .input-group{
     padding: 10px 0; 
}
 .article_item_comment .form_box #editor{
     width: 100%;
 }
.article_item_comment .form_box .editor{
     width: 100%;
     height: 200px;
 }
 .form_footer{
     text-align: center;

 }
.form_footer > input{
    padding: 0 40px;
}
.article_item_breadcrumbs a{
    display: inline;
    color:#337ab7;
}
</style>
