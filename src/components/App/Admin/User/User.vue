<template>
	<div class="teml_index">
		<el-button type="primary" @click="saveUserDialog">
			<i class="el-icon-edit"></i> &nbsp;添加
		</el-button>
		<div class="userlist">
			  <el-table :data="list" tripe style="width: 100%" empty-text="数据为空,请添加数据"> 
			   	<el-table-column prop="id" align="center" label='用户id'>
			    </el-table-column>
			    <el-table-column prop="userName" align="center" label="用户名">
			    </el-table-column>
			    <el-table-column prop="email" label="邮箱" align="center">
			    </el-table-column>
			    <el-table-column  prop="phoneNum" align="center" label="联系方式">
			    </el-table-column>
			    <el-table-column label="操作" align="center">
				    <template scope="scope">
			        		<el-button type="warning" @click="deleteUser(scope.row.id)">删除</el-button>
			      	</template>
		      	</el-table-column>
  			</el-table>
  			<div class="page_box" align="center" v-if='totalRows > 10'>
  				<el-pagination 
	 		  	 	layout="prev, pager, next"
	    		  	:total="totalRows"
	    		  	@current-change="handleCurrentChange"
	    		  	:current-page="currentPage">
	  			</el-pagination>
  			</div> 
  		</div>
  		<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
	  		<el-form :model="user"  label-width="80px" :rules="validate"  ref="user">
			  	<el-form-item label="用户名:" prop="userName">
			    	<el-input v-model="user.userName" auto-complete="off"></el-input>
			  	</el-form-item>
			 	<el-form-item label="密码:" prop="passWrod">
			  	  <el-input v-model="user.passWrod" auto-complete="off" type="password">
			 	  </el-input>
			  	</el-form-item>
			  	<el-form-item label="邮箱:" prop="email">
			  	  <el-input v-model="user.email" auto-complete="off">
			 	 </el-input>
			 	</el-form-item>
			 	<el-form-item label="电话:" prop="phoneNum">
			  	  <el-input v-model="user.phoneNum" auto-complete="off">
			 	  </el-input>
			    </el-form-item>
			    <el-form-item label="头像:">
					 <el-upload
					  class="avatar-uploader"
					  action= "http://www.28ph.cn/uplode/userHead"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="user.imgesUrl" :src="user.imgesUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
	 	 	</el-form>
	  		<div slot="footer" class="dialog-footer">
	   			<el-button @click="dialogFormVisible = false">取 消</el-button>
	    		<el-button type="primary" @click="submitForm('user')">确 定</el-button>
	  		</div>
	</el-dialog>
	</div>
</template>
<style scoped>
.teml_index{
    float: left;
    height: auto;
    width: 83%;
    padding: 15px 10px 0 15px;
}
.page_box{
	margin-top: 10px;
}
.teml_index .userlist{
	margin-top: 15px;
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
}
</style>
<script>
	import {User,Pagination} from "../../../../moduls/Modul.js";
	export default{
		data(){
			var userName = (rule, value, callback) => {
			    if (value === '' || value === undefined) {
			        callback(new Error('用户名不能为空'));
			    }else{
			    	callback();
			    } 
			};
			var passWrod = (rule, value, callback) => {
			    if (value === '' || value === undefined) {
			        callback(new Error('密码不能为空'));
			    }else{
			    	callback();
			    } 
			};
			var email = (rule, value, callback) => {
				var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
			    if (value === '' || value === undefined) {
			        callback(new Error('邮箱地址不能为空'));
			    }else if(!reg.test(value)){
					callback(new Error('邮箱格式不正确'));
			    }else{
			    	callback();
			    } 
			};
			return{
			    list: [],
				totalRows:0,
				currentPage:1,
				dialogFormVisible: false,
				startPags:0,
				pageSize:10,
				user:{
				  id:null,
		          userName:"",
		          passWrod:'',
		          email:'',
		          imgesUrl:''
		        },
		        validate: {
		          userName: [
		            { validator: userName, trigger: 'blur' }
		          ],
		          passWrod: [
		            { validator: passWrod, trigger: 'blur' }
		          ],
		          email: [
		            { validator: email, trigger: 'blur' }
		          ]
		      	}
		     

			}
		},
		created(){
			 this.queryUserList()
		},
		methods:{
			submitForm(formName) {
       			this.$refs[formName].validate((valid) => {
          			if (valid) {
            			var user = new User(this.user.id,this.user.userName,this.user.passWrod,this.user.email,this.user.imgesUrl,this.user.phoneNum,);
            			    /*添加一个用户*/
			         	this.$http.post(servicePath +'admin/user/add',user).then(function(response){
			         		if(response.body.message){
			         			this.dialogFormVisible = false;
			         			this.$message.success('恭喜你,成功添加了一个用户');
			         			this.user.passWrod = '';
			         			this.queryUserList()
			         		}

			          	},function(response){
							this.$message.error('服务器无响应,请联系管理员');
			          	});
          			} else {
           				this.$message.error('请仔细检查对应项,查看是否完整');
             			return false;
         		 	}
        		});
    		},
			queryUserList:function(){
				const page = new Pagination(this.startPags,this.pageSize);
  				this.$http.post(servicePath+'admin/user/queryUserList',page).then(function(response){
		    			var pageData = response.body 
						this.list = pageData.data.list;
						this.totalRows = pageData.data.total;
						this.currentPage = pageData.data.pageNum;//当前页
						console.log(pageData);
				}, function(response){
	      			this.$message.error('服务器无响应,请联系管理员');
				});
			},
			deleteUser:function(userId){
				this.$confirm('您是否确定删除该用户?', '提示', {
         			confirmButtonText: '确定',
         			cancelButtonText: '取消',
        		 	type: 'warning'
	        		}).then(() => {
	        			this.$http.jsonp(servicePath+'admin/user/deleteUser/'+userId).then(function(response){
			    			this.$message({
			           			type: 'success',
			            		message: '删除成功!'
			          		});
			          		this.queryUserList();
						}, function(response){
	      					this.$message.error('服务器无响应,请联系管理员');
						});
		         	
	        		}).catch(() => {
	        			this.$message({
	           			type: 'info',
	            	 	message: '已取消删除'
	         		});          
        		});
			},
			saveUserDialog:function(){
				this.user.id = null;
				this.user.userName = '';
			    this.user.email = '';
			    this.user.imgesUrl = '';
			    this.user.phoneNum = '';
			    this.user.passWrod = '';
				this.dialogFormVisible = true;
			},
			handleCurrentChange(val) {
				val = parseInt(val);
        		this.startPags = val;
        		console.log(this.startPags);
        		this.queryUserList();
      		},
			handleAvatarSuccess(res, file) {
			   if(res.message){
			   		this.user.imgesUrl = servicePath + res.data; 
			   }else{
			   		this.$message.error('上传错误,请联系管理员');
			   }
     		   
     		},
     		beforeAvatarUpload(file) {
      				const isJPG = file.type === 'image/jpeg';
        			const isLt2M = file.size / 1024 / 1024 < 2;
					if (!isJPG) {
          				this.$message.error('上传头像图片只能是 JPG 格式!');
        			}
    		        if (!isLt2M) {
         				 this.$message.error('上传头像图片大小不能超过 2MB!');
        			}
        		return isJPG && isLt2M;
      		}

    	}
  }
</script>