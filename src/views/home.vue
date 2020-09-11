<template>
	<div class='home'>
		<Logo />
		<div @click='search()' >
			<Input search placeholder="search"/>
		</div>
	</div>
</template>

<script>
	import {
		Input
	} from 'view-design'
	import Logo from '@/components/Logo'
	export default{
		components:{
			[Input.name]:Input,
			Logo
		},
		data(){
			return{
				value:''
			}
		},
		methods:{
			search(){
				this.$router.push('/search')
			}
		}
	}
</script>

<style scoped="">
 .home >>>.ivu-input-search{
	 background:red!important;
	 border:1px solid red !important;
 }
</style>
