<template>
	<div class="teml_index">
		<el-row :gutter="20" style="height: 90px">
			<el-col :span="6">
				<a class="header_box" href="#">
					<h3>文章总数</h3>
					<p>25文</p>
				</a>
			</el-col>
			<el-col :span="6">
				<a class="header_box" href="#" style="background-color:#20a0ff">
					<h3>总管理员</h3>
					<p>1个</p>
				</a>
			</el-col>
			<el-col :span="6">
				<a class="header_box" href="#" style="background-color:#13ce66">
					<h3>在线IP</h3>
					<p>12个</p>
				</a>
			</el-col>
			<el-col :span="6">
				<a class="header_box" href="#" style="background-color:#f7ba2a">
					<h3>文章分类</h3>
					<p>8个</p>
				</a>
			</el-col>
		</el-row>
		<el-row :gutter="24" id="chars">
			<el-col :span="13">
				<div id="main" style='height:320px;background-color:#fff'>
				
				</div>
			</el-col>
			<el-col :span="11">
				<div id="article_host">
					11111
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<style scoped>
	.teml_index{
		margin: 30px;
		margin-left: 270px;
		height: 100%;
		overflow: auto; 
	}
 	.index_headr{
 		width: 100%;
 		background-color:#f40;
 	}
 	.header_box{
 		display: block;
 		width: 100%;
 		height: 80px;
 		background-color: #E65D6E;
 		border-radius: 5px;
 		padding: 5px;
 		text-align: center;
 		color: #fff;
 		text-decoration: none;
 	}
 	.header_box h3{
		font-weight: 500;
 	}
 	#chars{
 		margin-right: 0 ;
 		padding:0;
 		width: 100%;
 		height: 320px;
 		padding-top: 20px;

 	}
 	#article_host {
 		width: 100%;
 		background-color: #fff;
 		height: 300px;
 		float: right;
 		color: #333;
 		box-shadow: 5px 5px #f6f6f6;
 	}
</style>
<script>
 	export default{
		data(){
			return{
			}
		},
		mounted(){
		}
	}

	
</script>