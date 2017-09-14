<template>
  <div class="admin_catalogue">
      <div class="admin_catalogue_left">
        <h3>增加新的目录</h3>
        <el-form ref="catalogueForm" :model="catalogueFrom" label-width="80px">
            <el-form-item label="目录名称">
                <el-input v-model="catalogueFrom.catalogName" placeholder="这将是它在站点上显示的名字"></el-input>
            </el-form-item>
            <el-form-item label="目录别名">
                <el-input v-model="catalogueFrom.catalogAlias" placeholder="“别名”是在URL中使用的别称"></el-input>
            </el-form-item>
            <el-form-item label="父级目录">
                 <el-select v-model="catalogueFrom.catalogParentId" placeholder="请选择父级目录">
                    <el-option label="无父级目录" value= 0 ></el-option>
                    <el-option v-for="item in parentCatalog" :key="item.catalogId" :label="item.catalogName" :value='item.catalogId'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否显示">
                  <el-switch on-text="" off-text="" v-model="catalogueFrom.isDisplay"></el-switch>
            </el-form-item>
            <el-form-item label="备注">
                   <el-input type="textarea" v-model="catalogueFrom.catalogueContext" placeholder="请描述该分类的作用"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-if="addOrUpdate" type="primary" @click="addCatalogue()">添加目录</el-button>
                <el-button v-if='!addOrUpdate' type="warning" @click="addCatalogue()">更新目录</el-button>
                <el-button @click="resetFrom">取消</el-button>
            </el-form-item>
            </el-form>
      </div>
      <div class="admin_catalogue_right">
         <el-table
            :data="catalogListDate"
            style="width: 100%"
            @row-click='readCell'>
            <el-table-column
                prop="catalogName"
                label="目录名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="catalogAlias"
                label="目录别名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="catalogContext"
                label="描述">
            </el-table-column>
             <el-table-column
                prop="catalogParentName"
                label="父级名称">
            </el-table-column>
        </el-table> 
      </div>
  </div>
</template>
<script>
import { Pagination,Catalogue } from './../../../../moduls/Modul.js'
export default {
  data(){
      return{
        catalogueFrom:{
                catalogId:null,
                catalogName: '',
                catalogAlias:'',
                catalogParentId:null,
                isDisplay:true,
                catalogueContext:''
        },
        catalogListDate:[],
        parentCatalog:null,
        startPags:0,
        pageSize:10,
        addOrUpdate:true,
        total:0
      }
  },
  created(){
      this.getCatalogueByPid();
      this.getCatalogueList();
  },
  methods:{
        addCatalogue(){ 
            let catalogue = new Catalogue(this.catalogueFrom.catalogueId,this.catalogueFrom.catalogName,
                                            this.catalogueFrom.catalogAlias,this.catalogueFrom.catalogParentId,
                                            this.catalogueFrom.isDisplay,this.catalogueFrom.catalogueContext);
            this.$http.post(servicePath +'admin/catalogue', catalogue).then(function(response){
                if(response.body.message){
                    this.$message.success('添加数据成功');
                    this.getCatalogueList();
                    this.resetFrom();
                }
            },function(response){
                this.$message.error('服务器请求是失败!请来联系管理员');
            });
        },
        getCatalogueByPid(){
            this.$http.jsonp(servicePath +'admin/catalogue/getCatalogueByPid/0').then(function(response){
                if(response.body.message){
                    this.parentCatalog = response.body.data; 
                }
            },function(response){
                this.$message.error('服务器请求是失败!请来联系管理员');
            });
        },
        getCatalogueList(){ 
            const page = new Pagination(this.startPags,this.pageSize);
            this.$http.post(servicePath +'admin/catalogue/getCatalogueList',page).then(function(response){
                if(response.body.message){
                    this.catalogListDate = response.body.data;
                    this.total = response.body.total;
                }
            },function(response){
                this.$message.error('服务器请求是失败!请来联系管理员');
            });
        },
        resetFrom(){
            this.catalogueFrom.catalogueId = null,
            this.catalogueFrom.catalogName = '',
            this.catalogueFrom.catalogAlias = '',
            this.catalogueFrom.catalogParentId  = null,
            this.catalogueFrom.isDisplay = true,
            this.catalogueFrom.catalogueContext = null
            this.addOrUpdate = true;
        },
        readCell(row, event, column){
            let catalogId = row.catalogId;
            this.$http.jsonp(servicePath +'admin/catalogue/'+catalogId).then(function(response){
                this.addOrUpdate = false;
                if(response.body.message){  
                    this.catalogueFrom.catalogueId = response.body.data.catalogId;
                    this.catalogueFrom.catalogName = response.body.data.catalogName;
                    this.catalogueFrom.catalogAlias = response.body.data.catalogAlias;
                    if(response.body.data.catalogParentId == 0){
                         this.catalogueFrom.catalogParentId  = response.body.data.catalogParentId+'';
                    }else{
                         this.catalogueFrom.catalogParentId  = response.body.data.catalogParentId;
                    }
                    this.catalogueFrom.isDisplay = response.body.data.display;
                    this.catalogueFrom.catalogueContext = response.body.data.catalogContext;
                }
            },function(response){
                this.$message.error('服务器请求是失败!请来联系管理员');
            });
        }
    },
}
</script>
<style scoped>
.admin_catalogue{ 
  padding-top:30px;
  height: auto;
  overflow: auto;
}
.admin_catalogue_left{
    width: 47%;
    float: left;
    margin-right: 1%;
    padding-left: 2%;   
}
.admin_catalogue_right{
    width: 50%;
    float: left; 
}
.admin_catalogue_left h3{
    font-size: 20px; 
    color: #444;
    margin-bottom:20px; 
    margin-left: 10px;
}
</style>
 