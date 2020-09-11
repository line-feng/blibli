<template>
	<div class="dc-flex" style="width: 95%;margin: 15px auto;">
		<img :src='lists["vertical_cover"]' />
<!-- {{ lists["vertical_cover"] }} -->
		<!-- <el-image style="width: 100px; height: 100px" :src='lists["vertical_cover"]' /> -->

			<div style="margin-left: 10px;">
				<div class="text-weight">
					{{ lists['org_title'] }}
				</div>
				<div>
					<span v-for='(item,index) in lists["author_name"]' :key='index + " + "+ item'>
						{{ item }}
					</span>
				</div>
				<div>
					<span v-for='(item,index) in lists["styles"]' :key='index + " + "+ item'>
						{{ item }}
					</span>
				</div>
			</div>
	</div>
</template>

<script>
	import {
		Image
	} from 'element-ui'
	export default {
		props: ['lists'],
		components:{
			[Image.name]:Image
		},
		watch:{
			lists(){
				console.log(this.lists)
			}
		}
	}
</script>

<style scoped="">
	img {
		width: 80px;
		height: 100px;
	}
</style>
