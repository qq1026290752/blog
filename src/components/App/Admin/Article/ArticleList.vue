<template>
	<div class="teml_articles">
		 <el-table :data="tableData" border >
   			<el-table-column prop="articleId" label="ID" sortable align='center'/>
    		<el-table-column prop="articleTitle"  label="标题" align='center' :formatter="subStringVue"/>
   			<el-table-column prop="articleType"label="类型" align='center':formatter="ArticleTypeFormatter"
	   			:filters="[{ text: '转载', value: '转载' }, { text: '原创', value: '原创' }]"
	      			 :filter-method="filterArticleType"
	      			 filter-placement="bottom-end" >
      		</el-table-column>
   			<el-table-column prop="clicks" label="点击量" align='center' />
   			<el-table-column prop="articleStatus"label="状态"align='center'
				:filters="[{ text: '草稿', value: '草稿' }, { text: '发表', value: '发表' },{ text: '删除', value: '删除' }]"
      			    :filter-method="filterArticleStatus"
      			  	filter-placement="bottom-end" >
      			  	<template scope="scope">
				        <el-tag
				          :type="articleStatusColor(scope.row.articleStatus)">{{scope.row.articleStatus|showArticleStatus}}</el-tag>
			     	</template>
   			>
   			</el-table-column>
   			<el-table-column prop="userName"label="作者"align='center'  />
   			<el-table-column prop="createTime"label="创建时间"align='center' :formatter="DateFormatter"  />
  			 <el-table-column label="操作" align='center'>
				    <template  scope="scope">
				    	<el-button type="success" v-if= 'scope.row.articleStatus!=3'@click = 'editArticle(scope.row.articleId)'>更新</el-button>
			            <el-button v-if= 'scope.row.articleStatus <= 2' type="info" @click='deleteArticle(scope.row.articleId)'>删除</el-button>
			      	</template>
		      	</el-table-column>
		  </el-table>
	</div>
</template>
<style scoped>
	.teml_articles{
		padding: 15px 10px 0 15px;
		height: auto;
		overflow: auto;
	}
	.el-button {
		margin: 0;
	}
</style>
<script>
/*导入相关实体类*/
import {Article,Pagination} from "../../../../moduls/Modul.js"


/*导入相关工具类*/
import {formatDate} from '../../../../utils/utils.js'
	export default{
		data(){
			return{
		        tableData:[],
		        startPags:0,
				pageSize:10,
			}
		},
		/*局部过滤器*/
		filters:{
			showArticleStatus(value){
				if (value == 1) {
					return '草稿'
				}else if(value == 2){
					return '发表'
				}else{
					return '删除'
				}
			}
		},
		created(){
			this.getArticleList(); 
		},
		methods: {
		  	ArticleTypeFormatter(row, column){
		     	var property = row[column.property];
		     	if(property==1){
		     		return '原创';
		     	}else if(property == 2){
		     		return '转载';
		     	}
		   	}, 
		   	getArticleList(){
		   		const page = new Pagination(this.startPags,this.pageSize);
		   		this.$http.post(servicePath +'admin/article/queryArticle',page).then(function(response){
		   			this.tableData = response.body.data;
		   		},function(response){
		   			this.$message.error('服务器请求是失败!请来联系管理员');
		   		});
		   	},
		   	articleStatusColor(column){
		   		if(column===1){
		   			return "primary"
		   		}else if(column===2){
		   			return "success"
		   		}else{
		   			return "warning"
		   		}
		   	},
		    filterArticleStatus(value, row){
		      	if(row.articleStatus==1){
		     		return "草稿" === value;
		     	}else if(row.articleStatus == 2){
		     		return '发表'=== value;
		     	}else{
		     		return '删除'=== value;
		     	}
		      return row.articleStatus === value;
		    },
		    filterArticleType(value, row){
		      	if(row.articleType==1){
		     		return "转载" === value;
		     	}else if(row.articleType == 2){
		     		return '原创'=== value;
		     	} 
		      return row.articleType === value;
		    },
		    DateFormatter(row, column){
		     	var date = row[column.property];
		     	return  formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss');
			},
			subStringVue(row, column){
				var value = row[column.property]; 
				if(value.length>15){
					value = value.substring(0,15)+"..."
				}
				return value;
			},
		    deleteArticle(articleId){
		    	var article = new Article(articleId,null,null,null,null,null,3);
		    	this.$http.post(servicePath +'admin/article/updateArticle',  article).then(function(response){
		    		if (response.body.message) {
		    			this.$message.success('文章已放入回收站');
		    			this.getArticleList();
		    		}
		   		},function(response){
		   			this.$message.error('服务器请求是失败!请来联系管理员');
		   		});
		    },
		    editArticle(articleId){
		    	this.$router.push({
					path: '/admin/editArticle/'+articleId
				})
		    },
     	}
	}

</script>