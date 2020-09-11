import Vue from 'vue'
import VueRouter from 'vue-router'
import automatic from './path.js'

import {
	LoadingBar
} from 'view-design'

Vue.use(VueRouter)

let routersAuto = automatic('/home', false, () => {

})

console.log(routersAuto)
const routes = routersAuto

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})


router.beforeEach((to, from, next) => {
	LoadingBar.start();
	next();
});

router.afterEach(route => {
	LoadingBar.finish();
});

export default router
