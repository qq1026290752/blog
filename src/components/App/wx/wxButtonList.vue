<template>
    <div class="button_tmpl">
        <el-button type="success" @click='inputButton()'>添加该菜单</el-button>
        <el-button type="success" @click='synchronization()'>微信同步</el-button>
        <!-- Form -->
        <el-dialog title="添加按钮组件" :visible.sync="dialogFormVisible">
            <div class="seleteType">
                <input type="button" value="一级菜单" :class='{"active":isShow==true}' @click="oneMenus()">
                <input type="button" value="二级菜单" :class='{"active":isShow==false}' @click="twoMenus()" :disabled="disabled">
            </div>
      
            <el-form :model="menuForm" label-width="100px">
                <el-form-item label="父级菜单" v-if="isShow!=true">
                    <el-select v-model="menuForm.paterId" placeholder="请选择父级菜单">
                        <el-option v-for="item in oneMenu" :key="item.id" :label="item.name" :value=item.id></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="菜单名称">
                    <el-input v-model="menuForm.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单类型">
                     <el-select v-model="menuForm.type" placeholder="请选择菜单类型">
                        <el-option label="网页类型" value="view"></el-option>
                        <el-option label="点击类型" value="click"></el-option>
                        <el-option label="小程序类" value="miniprogram"></el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单KEY值" v-if="menuForm.type == 'click'">
                    <el-input v-model="menuForm.key"></el-input>
                </el-form-item>
                <el-form-item label="要跳转到URL" v-if="menuForm.type == 'view' ||menuForm.type == 'miniprogram'">
                    <el-input v-model="menuForm.url"></el-input>
                </el-form-item>
                <el-form-item label="小程序appid" v-if="menuForm.type == 'miniprogram'">
                    <el-input v-model="menuForm.appid"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resutForm()">重置菜单</el-button>
                <el-button type="success" @click="addMenus()">添加该菜单</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
//引入Button对象
import {WxButton} from "../../../moduls/Modul.js"
export default {
    data() {
        return {
            dialogFormVisible: false,
            active:'active',
            isShow:true,
            disabled:true,
            oneMenu:null,
            menuForm:{
                id:null,
                name:'',
                paterId:0,
                type:'',
                key:'',
                url:'',
                media_id:'',
                appid:'',
                pagepath:''
            }
        }
    },
    created(){
        this.getOneMenus();
    },
    methods: {
        oneMenus(){ 
            this.isShow = true;
            this.resutForm();
        },
        twoMenus(){
            
            this.isShow = false;
            this.resutForm();
        },
        addMenus(){
            var button = new WxButton(this.menuForm.id,this.menuForm.name,this.menuForm.type,
                                      this.menuForm.key,this.menuForm.url,this.menuForm.appid,this.menuForm.pagepath,
                                      this.menuForm.paterId,null);
            console.log(this.menuForm.paterId);
            this.$http.post(servicePath +'admin/addButtonMenus',button).then(function(response){
			    	if (response.body.message) { 
                        this.$message.success('按钮添加成功');
                        this.getOneMenus();
                        this.dialogFormVisible = false;
			    	}else{
			    		 
			    	}
				},function(response){		
					this.$message.error('抱歉!程序出现错误!请联系管理员');
				});
        },
        resutForm(){
            this.menuForm.name = '';
            this.menuForm.paterId = null;
            this.menuForm.type = '';
            this.menuForm.key = '';
            this.menuForm.url = '';
            this.menuForm.media_id = '';
            this.menuForm.appid = '';
            this.menuForm.pagepath = '';
        },
        inputButton(){
            this.dialogFormVisible = true;
            this.resutForm();
        },
        //获取全部一级菜单
        getOneMenus(){
                this.$http.jsonp(servicePath +'admin/getOneMenus').then(function(response){
                    this.oneMenu = response.body.data;
                 
			    	if (response.body.message) {
                        this.oneMenu = response.body.data;
                        if(this.oneMenu.length!=0){
                            this.disabled = false;
                        } 
                        console.log(response.body.data);
			    	}else{
			    		 
			    	}
				},function(response){		
					this.$message.error('抱歉!程序需要了错误!请联系管理员');
				});
        },
        synchronization(){
              this.$http.jsonp(servicePath +'admin/wxMenusButton').then(function(response){
			    	if (response.body.message) {
                        this.$message.success( response.body.data);
			    	}else{
			    		this.$message.error( response.body.data);
			    	}
				},function(response){		
					this.$message.error('抱歉!程序需要了错误!请联系管理员');
				});
        }
    }
}
</script>
<style>
.button_tmpl {
    margin-top: 50px;
    margin-left: 300px;
    margin-right: 60px;
}
.seleteType{
    width: 100%;
    height: 34px;
    line-height: 34px;
    display: flex;
    justify-content:center;
    margin-bottom: 40px;
}
.seleteType input{
    width: 150px;
    border: 0;
    border-radius:0px 
}
.seleteType .active{
    background-color: #5bc0de;
    color: #F3F3F3;
}
</style>
