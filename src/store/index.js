import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  details:{
		  
	  }
  },
  mutations: {
	  details(context,item){
		  context['details'] = item
	  }
  },
  actions: {
  },
  modules: {
  }
})
