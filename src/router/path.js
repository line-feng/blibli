function automatic(routing, navigationOpen, fun) {

	const requireComponent = require.context('@/views', true, /\.vue$/)

	// 主页面框架，所有自动配置的路由都放到此处
	const mainLayoutRouter = []
	
	//默认重定向
	mainLayoutRouter.push({
		path: '*',
		redirect: routing
	})
	
	try {

		//遍历views文件下所有文件
		requireComponent.keys().forEach(filePath => {

			const componentPath = filePath.replace(/^\.\//, '').replace(/\.vue$/, '').toLowerCase() // 剥去文件名开头的 `./` 和`.vue`结尾的扩展名
			const componentName = componentPath.replace(/\//g, '-').toLowerCase()
			const chunckNames = filePath.replace(/^\.\//, '')

			const result = {
				path: '/' + componentPath, // home/detail
				name: componentName, // home-detail
				// component: () => component,
				// TODO 设置打包后文件名
				component: () => import( /* webpackChunkName: "[request]" */ `@/views/${chunckNames}`),
				children: [],
				// meta: {
				// 	/*标明需要登录*/
				// 	auth: true
				// },
			}

			//开启全局导航
			if (navigationOpen) {
				result['meta'] = {
					auth: true
				}
			}

			//将父路由与子路由拆开
			if (find(filePath) > 1) {
				//过滤 “ / ”
				let arrPath = removeFilter(filePath),
					//查询目标位置再返回
					ItemPush = search(arrPath, mainLayoutRouter);

				// if(!ItemPush['children']) return
				//插入数据
				let pathObj = {
					path: '/' + componentPath,
					name: componentName,
					component: () => import(`@/views/${chunckNames}`),
					children: []
				}
				//嵌套路由开启全局导航
				if (navigationOpen) {
					pathObj['meta'] = {
						auth: true
					}
				}

				fun(result)

				if (ItemPush['children'].length == 0) {
					ItemPush['path'] = ItemPush['path'] + '*'
				}

				//路由重定向
				let [, redirectName] = componentName.split('-')

				if (redirectName == 'index') {
					ItemPush['redirect'] = '/' + componentPath
				} else if (redirectName == 'home') {
					ItemPush['redirect'] = '/' + componentPath
				} else if (ItemPush['children'].length == 0) {
					ItemPush['redirect'] = '/' + componentPath
				}

				ItemPush['children'].push(pathObj)

			} else {
				//父路由直接插入
				fun(result)
				mainLayoutRouter.push(result)
			}
		})


	} catch (error) {
		console.log(error.message)
	}
	//返回数据
	return mainLayoutRouter
}

//根据name搜索路由
function search(arrPaths, mainLayoutRouter) {
	let parent = null

	function findParent(routers, parentName) {
		try {
			routers.forEach(route => {
				if (route.name === parentName) {
					parent = route
				} else if (route.children && route.children.length) {
					findParent(route.children, parentName)
				}
			})
		} catch (err) {
			console.log(err)
		}
	}

	for (let i = 0; i < arrPaths.length - 1; i++) {
		findParent(mainLayoutRouter, arrPaths[i])
	}
	return parent
}

//过滤
function removeFilter(filePath) {

	filePath = filePath.replace(/\./, '*')
	filePath = filePath.replace(/\//g, '*')
	let arrPath = filePath.split('*')
	for (let i = 0; i < arrPath.length; i++) {
		if (arrPath[i] == '') {
			arrPath.splice(i, 1)
			i--
		}
	}

	for (let i = 0; i < arrPath.length; i++) {
		if (i != 0 && i != arrPath.length - 1) {
			arrPath[i] = arrPath[i - 1] + '-' + arrPath[i]
		}
	}

	return arrPath
}

//区分父路由和子路由
function find(val) {
	let cont = 0;
	for (let i = 0; i < val.length; i++) {
		if (val[i] == '/') {
			cont++
		}
	}
	return cont
}

//导出方法
export default automatic
