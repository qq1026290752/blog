<template>
	<div class="tepl-left">
		<el-menu default-active="/admin/Index" router class="el-menu-vertical-demo">
      		<el-submenu index="1">
       			 <template slot="title"><i class="iconfont icon-artboard7">基础设置</i></template>
       		     <el-menu-item index="/admin/Index">首页</el-menu-item>
          </el-submenu>
     		  <el-submenu index="2">
             <template slot="title"><i class="iconfont icon-renyuan">人员设置</i></template>
               <el-menu-item index="/admin/userList">用户管理</el-menu-item> 
          </el-submenu>
           <el-submenu index="3">
             <template slot="title"><i class="iconfont icon-wenzhang">文章设置</i></template>
               <el-menu-item index="/admin/article">添加文章</el-menu-item>
               <el-menu-item index="/admin/ArticleList">全部文章</el-menu-item>
			   <el-menu-item index="/admin/catalogue">分类管理</el-menu-item>
          </el-submenu>
		  <el-submenu index="4">
             <template slot="title"><i class="iconfont icon-weixin">微信管理</i></template>
               <el-menu-item index="/admin/wxButton">微信按钮管理</el-menu-item> 
          </el-submenu>
   		</el-menu>
	</div>
</template>
<script>
 export default{
        data() {
		      return {
		        
		      }
   		},
   		created(){},
	    methods:{

   		}
    }
	 
</script>
<style scoped>
@import url('https://at.alicdn.com/t/font_400037_lb7rnzvtrhzuayvi.css');
.tepl-left{
	width: 16%;
}
.el-menu-vertical-demo{
	width: 100%;
	height: 100%;
	float: left;
	overflow: hidden;   
}
</style>