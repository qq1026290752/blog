<template>
	<div id="teml_login">
	 
	 	 <el-alert v-if="isError" :title="errorMessage" type="error"show-icon></el-alert>
		 
		<div class="login_box">
			 <el-form ref="form" :model="form"  :rules="validate"  label-width="60px">
			  <el-form-item label="用户名:" prop="userName">
			    <el-input v-model="form.userName" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码:" prop="passWrod">
			    <el-input v-model="form.passWrod" auto-complete="off" type="password">
			    	
			    </el-input>
			  </el-form-item>
			  <div class="btnBox">
			  		<el-button type="primary" @click="submitForm('form')">立即登陆</el-button> 
			  </div>
			</el-form>
		</div>
	 </div>
</template>
<style scoped>
	#teml_login{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("../../../static/images/login.jpg") no-repeat center;
	}
 	.login_box{
 		width: 600px;
 		height: 200px;
 		background-color: #fff;
 		opacity: 0.9;
 		border-radius:10px;
 		box-shadow: #fff 10px;  
 		margin:200px auto;
 		padding: 25px; 
 	}
 	.error{
 		color: #f40;
 	}
 	.btnBox{
 		text-align: center;
 	}
</style>
<script>
	import {User} from "../../moduls/Modul.js"
	export default{
		    data() {
				var userName = (rule, value, callback) => {
			        if (value === '' || value === undefined) {
			        	console.log(value);
			          	callback(new Error('用户名不能为空'));
			        }else{
			        	 callback();
			        }
			      };
			      var passWrod = (rule, value, callback) => {
			        if (value === '' || value === undefined) {
			          callback(new Error('请再次输入密码'));
			        }else{
			        	 callback();
			        }
			      };
		      return {
		        form:{
		          userName:"",
		          passWrod:'',
		        },
		        isError:'',
		        errorMessage:'',
		        validate: {
		          userName: [
		            { validator: userName, trigger: 'blur' }
		          ],
		          passWrod: [
		            { validator: passWrod, trigger: 'blur' }
		          ]
		        }
		      };
		    },
		    methods: {
		      submitForm(formName) {
		      	this.isError = false;
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	  var user = new User(null,this.form.userName,this.form.passWrod); 
			          /*ajax请求登陆*/
			          this.$http.post(servicePath +'admin/user/login',user).then(function(response){
						    if(response.body.status==301||response.body.status==302){
						    	this.errorMessage = response.body.message;
						    	this.isError =true
						    }else if (response.body.status==200){
						    	var data = response.body.data;
						    	this.$store.state.user =response.body.data;
						    	 
						    	//转发的用户首页
						    	this.$router.push({
							    	path: '/admin/Index'
							 	 })
						    }
					  }, function(response){
						   this.errorMessage = '服务异常,请稍后！或者请联系管理员'
						   this.isError =true
					  });
		          } else {
		            this.errorMessage = '验证异常,请稍后！或者请联系管理员'
					this.isError =true
					return;
		          }
		        });
		      }
		    }
  		}
</script>