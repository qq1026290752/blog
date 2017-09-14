<template>
    <div class="tepm_header">
	   	<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
		   <el-submenu index="1" class="title">
				<template slot="title">{{user.userName}}</template>
			    <el-menu-item index="1-1" @click="logout">退出</el-menu-item>
			    <el-menu-item index="1-2">修改资料</el-menu-item>
		   </el-submenu> 
		</el-menu>
    </div>
</template>
<style scoped>
	.title{
		float: right;
	}
</style>
<script>
    export default{
        data() {
		      return {
		        activeIndex: '1',
		        activeIndex2: '1',
		        user:this.$store.state.user
		      };
   		 },
	    methods: {
	      logout:function(){
	      	this.$router.push({
				path: '/Login'
			})
	      }
   		}
    }
</script>