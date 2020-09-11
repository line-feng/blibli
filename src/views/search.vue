<template>
	<div class='search'>
		<Input :value='value' @on-search='search()' v-model='value' search enter-button placeholder="search"
		 @on-click='search()' />
		<div>
			<div v-for='(item,index) in  lists' :key='index' @click='details(item)'>
				<lists :lists='item' />
			</div>
			<Spin size="large" fix v-if="spinShow">
				<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
				<div>Loading</div>
			</Spin>
		</div>
	</div>
</template>

<script>
	import {
		Input,
		Spin,
		Icon
	} from 'view-design'
	import lists from '@/components/lists'
	export default {
		components: {
			[Input.name]: Input,
			[Icon.name]: Icon,
			[Spin.name]: Spin,
			lists
		},
		data() {
			return {
				value: '',
				lists: [],
				spinShow: false
			}
		},
		watch:{
			value(){
				if(this.value == ''){
					this.lists = []
				}
			}
		},
		methods: {
			search() {
				if (this.value != '') {
					this.spinShow = true
					this.$axios({
							url: 'http://192.168.43.208:8081/post/search',
							method: 'post',
							data: this.$qs.stringify({
								name: this.value
							})
						})
						.then(res => {
							this.lists = res.data.data['list']
							this.spinShow = false
						})
				}
			},
			details(item) {
				this.$router.push({
					name:"details",
					params:item
				})
			}
		}
	}
</script>

<style scoped="">
	.search>>>.ivu-input-search {
		background: red !important;
		border: 1px solid red !important;
	}

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
