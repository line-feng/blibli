<template>
	<div>
		<!-- {{ $route.params }} -->
		<img :src='item["horizontal_cover"]' style='width:100%' />
		<Button type="info" ghost @click='go(item)'>目录</Button>
		<el-drawer title="我是标题" :visible.sync="drawer" :size='"50%"' :with-header="false">
			<div>
				<Scroll :height='childW' :on-reach-bottom="handleReachBottom">
					<div @click='watchCartoon(It)' class='lists' style='padding:5px' v-for='(It,In) in directory' :key='It + "+" + In'>
						<div class='' style='lightgray;padding:5px'>
							<!-- {{ It }} -->
							<img :src='It["cover"]' style='width:70%' />
							<div class='text-weight dc-flex alit-center' style='margin:0 10px'>
								{{ It['title'] + (In + 1) }}
							</div>
						</div>
					</div>
				</Scroll>
			</div>
			<Spin size="large" fix v-if="spinShow">
				<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
				<div>Loading</div>
			</Spin>
		</el-drawer>
	</div>
</template>

<script>
	import {
		Button,
		Scroll,
		Spin,
		Icon
	} from 'view-design'
	import {
		Drawer
	} from 'element-ui'
	export default {
		components: {
			[Scroll.name]: Scroll,
			[Icon.name]: Icon,
			[Spin.name]: Spin,
			[Button.name]: Button,
			[Drawer.name]: Drawer
		},
		data() {
			return {
				item: this.$route.params,
				drawer: false,
				spinShow: false,
				directory: [],
				childW: document.documentElement.clientHeight,
			}
		},
		created() {
			if (this.item['id']) {
				this.item = this.$route.params;
				this.$store.commit('details', {
					directory: this.directory,
					item: this.item
				})
			} else {
				this.item = this.$store.state.details.item
				this.directory = this.$store.state.details.directory
			}
		},
		methods: {
			go(item) {
				this.drawer = true
				this.spinShow = true
				this.$axios({
						url: 'http://192.168.43.208:8081/post/directory',
						method: 'post',
						data: this.$qs.stringify({
							comic_id: item['id']
						})
					})
					.then(res => {
						// console.log(res.data.data['ep_list'].length)
						this.directory = res.data.data['ep_list'].reverse()
						this.spinShow = false
					})
			},
			handleReachBottom() {
				return new Promise(resolve => {
					// setTimeout(() => {
					// 	// const last = this.list1[this.list1.length - 1];
					// 	// for (let i = 1; i < 11; i++) {
					// 	// 	this.list1.push(last + i);
					// 	// }
					// 	// resolve();
					// }, 2000);
				});
			},
			watchCartoon(item) {
				this.$axios({
						url: 'http://192.168.43.208:8081/post/chapter',
						method: 'post',
						data: this.$qs.stringify({
							ep_id: item['id']
						})
					})
					.then(res => {
						console.log(res.data)
						this.$router.push({
							name: 'imgs',
							params: {
								directory: this.directory,
								data: res.data
							}
						})
					})
			}
		}
	}
</script>

<style scoped>
	.lists {
		border-bottom: 1px solid lightgray
	}

	.lists:last-child {
		border-bottom: 1px solid rgba(0, 0, 0, 0)
	}
</style>
