<template>
 	<div class="index_teml">
		 <div class="container">
			<div class="index_header">
				<div class="index_log col-xs-2 col-sm-2 col-md-2 col-lg-2">
					显示LOG
				</div>
				<ul class="header_list col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<li class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-for="item in catalogueIds" :key="item.catalogId">
						<a href="#">{{item.catalogName}}</a>
					</li>
					<li class="col-xs-3 col-sm-3 col-md-3 col-lg-3"><a href="#">个人简历</a></li>
				</ul>
				<div class="index_login col-xs-4 col-sm-4 col-md-4 col-lg-4">
					<form action="#" id="seach_form"class='col-xs-12 col-sm-12 col-md-12 col-lg-12' >
						<input type="text" value="" class="seach_text col-xs-8 col-sm-8 col-md-8 col-lg-8" placeholder="请输入查询条件" >
						<input type="button" value="搜索" class="seach_submit col-xs-4 col-sm-4 col-md-4 col-lg-4" >
					</form>
				</div>
			</div>
			<div class="speedbar">
				<div class="speedbar_left fl">
					<span class="new_message">最新消息:</span>
					<span class="new_info">关注九零码农，专注web安全。恶搞科技，戏说各种帽子。苦逼的职业码农，JAVAEE开发</span>
				</div>
				<div class="login_user fr">
					<span class="iconfont icon-denglu"></span>
					<router-link to="/Login" class="login_href">登陆</router-link>
				</div>
			</div>
	 		<div class="context">
				<div class="context_view">
					<router-view>
					</router-view>
				</div>
 				<div class="sidebar fr">
					<div class="article_list_title">
						<h3>最新文章</h3>
					</div>
					<ul class="new_article_list mdl-shadow">
						<li class="article_li" v-for="item in newsAticleList" :key="item.articleId" > 
							<router-link :to="{ name: 'article', params: { id:item.articleId }}" class="article_link">{{item.articleTitle}}</router-link>
							<p class="art_time">{{item.createTime|DateFormatter}}</p>
						</li>
					</ul>  
					<div class="article_list_title">
						<h3>意见反馈</h3>
					</div>
					<div class="user_couple mdl-shadow">
						<form class="form-inline">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon"><span class="iconfont icon-user1"></span></div>
									<input type="text" class="form-control"placeholder="用户昵称"> 
								</div>
								<div class="input-group">
									<div class="input-group-addon"><span class="iconfont icon-185078emailmailstreamline"></span></div>
									<input type="text" class="form-control"placeholder="电子邮箱"> 
								</div>
								<div class="input-group">
									<div class="input-group-addon"><span class="iconfont icon-iconfontcolor39"></span></div>
									<input type="text" class="form-control"placeholder="联系电话"> 
								</div>
								<div class="input-group">
									<textarea class="form-control input_textarea" rows="3" placeholder="请输入您的意见"></textarea>
								</div>
								<div class="form_footer">
									<input type="button" value="提交" class="seach_submit">
								</div>
							</div>
							
						</form>
					</div> 
					<div class="article_list_title">
						<h3>个人联系方式</h3>
					</div>
					<div class="call_me mdl-shadow">
						本博客创建于2015年5月18日<br/>
						联系人<br/>
						qq:1026290752<br/>
						邮箱:1026290752@qq.com<br/> 
					</div>
				</div> 
			 </div>
			<div class="footer_index">
				<div class="footer_left fl" ></div>
				<div class="footer_right">
					<div class="foot_message">
						版权所有，保留一切权利！ © 2017 
							<a href="http://www.28ph.cn" class="footer_href" target="_blank" >九零码农</a> 
							<a href="http://www.miitbeian.gov.cn/" class="footer_href"  rel="external nofollow" target="_blank">鲁ICP备15016443</a> 
					</div>
				</div>
			</div>	 
		</div>
		
	</div>
</template>
<script>
/*导入原生websocket*/
import '../../../../static/js/web_socket.min.js'
let ws = null;
export default {
	data(){
		return{
			newsAticleList:[],
			catalogueIds:[]
		}
	},
	created(){	
		//初始化websoket
		this.inItWebSocket();
		this.getNewsAticle();
		this.getCatalogue();
	},
	methods:{
		getNewsAticle(){
			this.$http.jsonp(servicePath +'article/getNewsAticle').then(function(response){ 
				if (response.body.message) { 
					this.newsAticleList = response.body.dataList; 
				}  
			},function(response){		
				this.$message.error('抱歉!程序出现错误!请联系管理员');
			});
		},
		getCatalogue(){
			this.$http.jsonp(servicePath +'catalogue/getCatalogueByIds').then(function(response){ 
				if (response.body.message) { 
					this.catalogueIds = response.body.data; 
				}
				console.log(	this.catalogueIds )
			},function(response){		
				this.$message.error('抱歉!程序出现错误!请联系管理员');
			});
		},
		inItWebSocket(){
			let that = this;//
			let webSocketPath = 'ws://'+HostPath+'/ws';
			if ('WebSocket' in window) {
				ws = new WebSocket(webSocketPath);
				this.$message.success('已连接服务器,等待数据刷新');  
			} else if ('MozWebSocket' in window) {  
				ws = new MozWebSocket(webSocketPath); 
				this.$message.success('已连接服务器,等待数据刷新');
			} else {  
				alert('WebSocket is not supported by this browser.');  
			} 
			/*
				*同步资源	
				*/
			var nowDate = new Date();
			let userNumber = nowDate.getFullYear().toString()+(nowDate.getMonth()+1).toString()+nowDate.getDate().toString() + (Math.round(Math.random()*899999999999+100000000000)).toString();
			ws.onopen = function(){ 
					ws.send(userNumber);
			};
			ws.onmessage = function (event) {  
				that.$notify.info({
					 title: '提醒',
          			 message: '博主新发布了一篇博客,赶快去围观吧',
					 duration:0  
				});
			};  
			ws.onclose = function () {
				ws.clonse();
			};  
		}
	}
}
</script>

<style scoped>
.container{
	width: 1400px;
	padding-left: 0;
}
.index_teml{
	background-color: #eeeeee;
	margin: 0;
	padding: 0;
}
.index_header{
	width: 100%;
	height: 60px;
	background-color: #ccc;
	line-height: 60px;
	color: #ffffff;
	overflow: hidden;
}
.header_list {
	height: 100%;
	background-color:#4a4a4a ;
}
.header_list li{
	text-align: center;
	height: 100%;
	font-size: 16px;
}
.header_list a:hover{
	color: #fff;
	text-decoration-line: none;
}
.index_log{
	background-color: #20a0ff;
	height: 100%;
}
.index_login{
	background-color:#4a4a4a;
	height: 100%;
}
#seach_form input{
	margin-top: 13px;
}
.seach_text{
	height: 34px;
	display: inline-block;
	padding: 5px 6px 3px;
	margin-bottom: 10px;
	font-size: 12px;
	line-height: 20px;
	color: #555555;
	border-radius: 0;
	vertical-align: middle;
}
a:hover{
	background-color: #444;
}
.footer_index{
	margin-top: 12px;
	height: 50px;
	line-height: 50px;
}
.footer_left{
	width: 10px;
	height: 100%;
	background-color: #20a0ff;
}
.footer_right{
	background-color: #444;
	color: #f0f0f0; 
}
.foot_message{
	margin-left: 30px;
}
.footer_href{
	display: inline;
	margin: 0 8px;
	text-align: center;
}
.footer_href:hover{
	text-decoration: inherit;
}
.speedbar{
	margin-bottom: 12px;
	clear: both;
	color: #666;
	background-color: #F7F7F7; 
	line-height: 22px;
	overflow: hidden;
	height: 22px;
	font-size: 12px；
}
.new_message{
	color:#34d058;
	font-weight: 500;
	margin-left: 20px;
}
.new_info{ 
	font-weight: 300;
}
.speedbar .login_user{
	margin-right:10px;  
	height: 100%;	
}
.speedbar .login_href{
	margin-left:5px; 
	background-color: #F7F7F7;
	color: #428BD1;
	display: inline-block;
	width: 60px;	
}
.speedbar .login_href:hover{
	color:#3071A9;
}
/**===============================================================**/
.context{
	width: 100%;
	overflow: hidden;
}
.context .context_view{
	width: 75%;
	float: left;
}
.sidebar{
	width: 24%; 
}
.sidebar .call_me{
	padding: 8px;
	background-color: #ffffff;
}
.new_article_list{
	padding: 10px 0 0 0;
	background-color: #ffffff
}

.article_li{
	border-bottom: solid 1px #eee;
	padding: 8px 15px;
	font-size: 14px;
}
.article_li .article_link{
text-decoration: none;
color: #444;
}
.article_li .article_link:hover{
	background-color: #ffffff;
	color: #ccc;
}
.article_li .art_time{
	margin: 0;
	font-size: 12px;
	color: #999;
	margin-top: 2px;
}
.sidebar .user_couple{
	padding: 15px;
	background-color: #fff;
	margin-bottom: 20px;
}
.user_couple .input-group{
	margin-top: 8px;
}
.user_couple .input-group .input_textarea{
	width: 132%;
}
.form_footer{
	border-top:dashed 1px #888; 
	margin-top: 10px;
	padding-top: 5px;
	text-align: center
}
.seach_submit{
	height: 34px;
	background-color: #34d058;
	line-height:34px ;
	display: inline-block;
	padding: 6px 65px 4px;
	margin-bottom: 0;
	font-size: 12px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	border: 0;
	border-radius: 0;
	color: #fff;
}
.header_list li a:focus{
	text-decoration: none;
	color: #fff;
}
</style>