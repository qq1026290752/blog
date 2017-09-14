<template>
	<div class="temp_article">
		<el-form ref="article" :model="article" class="temp_article_from">
		<el-form-item>
			<el-col :span="4">
				<el-select v-model="article.articleType" placeholder="请选择文章类型">
					<el-option label="原创" value="1"/>
					<el-option label="转载" value="2"/>
				</el-select>
			</el-col>
			<el-col :span="16">
				<el-input v-model="article.articleTitle" placeholder="请填写文章标题"></el-input>
			</el-col>
		</el-form-item> 
		<el-form-item>
			<el-col :span="20">
				<el-input v-model="article.label" placeholder="请输入一句话作为文章总结"></el-input>
			</el-col>
		</el-form-item>	
		<div class="article_main">
			<el-form-item id="editor">
				<mavon-editor style="height:500px;border:1px solid #bfcbd9" ref="editor" @imgAdd='editorUpdataImgs'  v-model="article.content"/>	
			</el-form-item>
		</div>
		<div class="article_operate">
			<el-form-item>
				<el-select v-model="article.catalogPid"  placeholder="请选择所属目录" @change="getCatalogueById(article.catalogPid)">
					<el-option v-for="item in parentCatalog" :key="item.catalogId" :label="item.catalogName" :value='item.catalogId'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select  v-if="cataLogIds" v-model="article.catalogId" placeholder="请选择所属子目录">
					<el-option v-for="cat in cataLogIds" :key="cat.catalogId" :label="cat.catalogName" :value='cat.catalogId'></el-option>
				</el-select>
			</el-form-item>
			<div class="article_operate_title">
				<p>特色图片</p>
			</div>
			<div class="uplode_img">
				<el-button type="text" @click="uplodeImgDialog()" v-if="!success_images">上传特色图片</el-button>
				<img v-if="article.articleImageUrl" :src="article.articleImageUrl" class="avatar img-thumbnail">
			</div>
			<div class="submint_btn">
				<el-form-item v-if="article.articleStatus==1">
					<el-button type="primary" @click='saveArticle'>保存草稿</el-button>
					<el-button type="success" @click='addArticle'>发表博文</el-button>
				</el-form-item>
				<el-form-item v-if="this.article.articleStatus==2">
					<el-button type="success" @click='addArticle'>保存博文</el-button>
				</el-form-item>
			</div>
<!--				<el-form-item label="文章标签 :">
					<el-input v-model="article.label" placeholder="请用逗号分割"></el-input>
				</el-form-item>
				<el-form-item v-if="this.article.articleStatus==1">
					<el-col :span="6" :offset="6">
						<el-button type="primary" @click='saveArticle'>保存草稿</el-button>
					</el-col> 
					<el-col :span="6" :offset="3">
						<el-button type="success" @click='addArticle'>发表博文</el-button>
					</el-col>
				</el-form-item> 
				<el-form-item v-if="this.article.articleStatus==2">
					<el-col :span="6" :offset="9">
						<el-button type="success" @click='addArticle'>保存博文</el-button>
					</el-col>
				</el-form-item>-->
			</div> 
		</el-form>
		<el-dialog
			title="请选择您要上传的图片"
			:visible.sync="dialogVisible"
			size="tiny"
			:before-close="handleClose"
			class="uplodeImageDialog"
			>
			<el-upload
				class="avatar-uploader"
				action="http://ws.28ph.cn/uplode/userHead"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="lodeImages()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	
	import {Article} from "../../../../moduls/Modul.js"
	export default{
	data(){
		return{
			article: {
	          articleType:null,
	          articleTitle:'',
	          articleStatus:1,
	          articleId:'',
	          content:'',
			  label:'',
			  articleImageUrl:'',
			  catalogPid:null,
			  catalogId:null
	        },
			user:this.$store.state.user,
			dialogVisible: false,
			imageUrl:'',
			isUplodeImg : true,
			success_images:'',
			parentCatalog:[],
			cataLogIds:null  
		}
	},
	created(){
		this.initUpdata();
		this.getCatalogueByPid(0);
	},
 	/*局部过滤器*/
	filters:{
		showArticleType(value){
			if (value == 1) {
				return '原创'
			}else if(value == 2){
				return '转载'
			}else{
				return '删除'
			}
		}
	},
	methods:{
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {});
		},
		saveArticle:function(){
			 let article = new Article(this.article.articleId,this.article.articleTitle,
			 			this.user.id,this.article.content,this.article.label,this.article.articleImageUrl,
						this.article.articleType,this.article.articleStatus,
						this.article.catalogPid,this.article.catalogId); 
			this.$http.post(servicePath +'admin/article/addArticle',article).then(function(response){
					var data = response.body.data;
					this.article.articleId = data.articleId;
					this.$message.success('恭喜!草稿保存成功');
				},function(response){		
					this.$message.error('抱歉!草稿保存失败!请来联系管理员');
				});
		},
		addArticle:function(){
			this.article.articleStatus =  2 ;//发表
			let article = new Article(this.article.articleId,this.article.articleTitle,
			 			this.user.id,this.article.content,this.article.label,this.article.articleImageUrl,
						this.article.articleType,this.article.articleStatus,
						this.article.catalogPid,this.article.catalogId);
			this.$http.post(servicePath +'admin/article/addArticle',article).then(function(response){
						var data = response.body.data;
						this.article.articleId = data.articleId;
						this.$message.success('恭喜!文章保存成功');
						this.$router.push({//文章重定向到文章列表页面
							path: '/admin/ArticleList'
			})
			},function(response){		
				this.$message.error('抱歉!草稿保存失败!请来联系管理员');
			});
	  	},
		uplodeImgDialog(){
			this.dialogVisible = true;
		},
		lodeImages(){
			this.dialogVisible = false;
			this.success_images = this.imageUrl ;
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw); 
			this.isUplodeImg = false; 
			this.article.articleImageUrl = res.data;//上传的图片地址  
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isPng = file.type === 'image/png'
			const isLt2M = file.size / 1024 / 1024 < 2;  
			if (!isJPG || isPng) { 
			this.$message.error('上传头像图片只能是 JPG 格式!');
			} 
			if (!isLt2M) {
			this.$message.error('上传头像图片大小不能超过 2MB!');
			} 
			return isJPG && isLt2M;
		},
		getCatalogueByPid(id){
			this.$http.jsonp(servicePath +'admin/catalogue/getCatalogueByPid/'+id).then(function(response){
				if(response.body.message){
					this.parentCatalog = response.body.data; 
				}
			},function(response){
				this.$message.error('服务器请求是失败!请来联系管理员');
			});
		},
		getCatalogueById(id){
			this.cataLogIds = null;
			this.article.catalogId = null;
			this.$http.jsonp(servicePath +'admin/catalogue/getCatalogueByPid/'+id).then(function(response){
				if(response.body.message){
					this.cataLogIds = response.body.data; 
				}
			},function(response){
				this.$message.error('服务器请求是失败!请来联系管理员');
			});
		},
		initUpdata(){
			var path = this.$route.path
			if(path != '/admin/article'){
				//得到文章ID
				this.article.articleId = this.$route.params.articleId 
				this.$http.jsonp(servicePath +'admin/article/queryArticleById/'+this.article.articleId).then(function(response){
					if (response.body.message) {
						
						var data = response.body.data;
						this.article.articleId = data.articleId;
						this.article.articleType = data.articleType+"";
						this.article.articleTitle = data.articleTitle;
						this.article.articleStatus = data.articleStatus;
						this.article.content = data.content;
						this.article.label = data.label;
						this.article.articleImageUrl = data.articleImageUrl; 
						this.article.catalogPid = data.catalogPid;
						this.article.catalogId = data.catalogId;
					}else{
						this.$message.error('文章不存在');
						this.$router.push({
							path: '/admin/ArticleList'
						})
					}
				},function(response){		
					this.$message.error('抱歉!草稿保存失败!请来联系管理员');
				});
			 
			};
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
.temp_article{
  width: 83%;
  padding-top:30px;
  height: auto;
  overflow: auto;
}
.temp_article_from{
	margin-left: 1%;
}
.el-form-item{
	overflow: hidden;
}
.article_main{
	width: 70%;
	float: left;
	margin-right:1%; 
}
.article_operate{
	width: 28%;
	float: left;
	margin-top: 25px;
}
.article_operate_title{
	width: 70%;
	height: 45px;
	line-height: 45px;
	background-color: #f7f7f7;
	border: 1px solid #eaeaea; 
	text-align: center;
	overflow: hidden;
}
.article_operate_title p{
	margin-left:15;	 
}
.uplode_img{
	padding-top: 20px;
	width: 70%;
	text-align: center;
}
.uplode_img img,{
	margin: 0 auto;
}
.submint_btn{
	margin-top: 25px;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #20a0ff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
	margin: 0 auto;
}
.uplodeImageDialog{
	text-align: center;
}

</style>