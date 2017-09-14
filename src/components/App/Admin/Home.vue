<template>
	<div class="teml_Home">
		<vHeader></vHeader>
		<vLeft></vLeft>
		<router-view></router-view>	
	</div>
</template>
<style scoped>
	.teml_Home{
		width: 100%;
		background-color: #f1f1f1;
		overflow: hidden;
		height: 100%;
	}
</style>
<script>
	import vHeader from  "./common/vHeader.vue"
	import vLeft from "./common/vLeft.vue"
	export default{
		data(){
			return{
			}
		},
        components:{
            vHeader,
            vLeft
        }
	}
</script>