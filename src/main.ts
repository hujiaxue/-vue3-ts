/* eslint-disable import/no-duplicates */
import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'
import store from './store'
import { setupStore } from './store'
import { globalRegister } from './global'
// import hyRequest from './service'
import 'normalize.css'
import '@/assets/css/index.less'
// elementplus 全局引入
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
// console.log(process.env.NODE_ENV)

// 测试单个请求拦截器
// hyRequest
//   .request<any>({
//     url: 'http://123.207.32.32:8000/home/multidata',
//     method: 'GET',
//     headers: {},
//     showLoading: false,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的config')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的response')
//         return res
//       }
//     }
//   })
//   .then((res) => console.log(res))

// 定义接收数据类型
// interface DateType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest.get<DateType>({ url: '/login' }).then((res) => console.log(res))

const app = createApp(App)
app.use(globalRegister)

app.use(store)
setupStore()
// path: /user => user
app.use(router)
app.mount('#app')
