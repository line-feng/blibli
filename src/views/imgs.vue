<template>
	<div id='content' >
		<img :ref='"name" + index' :src='item' v-for='(item,index) in imgs' :key='item + "+" + index' style='width:100%' />
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				data: this.$route.params['data'],
				directory: this.$route.params['directory'],
				imgs: []
			}
		},
		created() {
			
			window.onscroll =  () => {
			
			　　var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			
			// 　　console.log(this.$refs)
			
			}

			for (let i = 0; i < this.data['data']['images'].length; i++) {
				this.$axios({
						url: 'http://192.168.43.208:8081/post/together',
						method: 'post',
						data: this.$qs.stringify({
							urls: "[\"" + this.data['data']['images'][i]['path'] + "\"]"
						})
					})
					.then(res => {
						// console.log(res.data)
						this.imgs.push(res.data['data'][0]['url'] + "?token=" + res.data['data'][0]['token'])
					})

			}


		},
		mounted(){
			 
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}

	@keyframes ani-demo-spin {
		from {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.demo-spin-col {
		height: 100px;
		position: relative;
		border: 1px solid #eee;
	}
</style>
