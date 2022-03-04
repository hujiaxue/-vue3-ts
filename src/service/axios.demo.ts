import axios from 'axios'

// 使用axios

// axios的实例对象
// 1.模拟get请求

axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
})

// 2.get请求 并且传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'coderwhy'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// // 3.post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// 额外补充的Promise中类型的使用
// Promise本身是可以有类型
// 使用泛型给promise类型 参数及返回值会自动推导为string类型
// (parameter) resolve: (value: string | PromiseLike<string>) => void
// new Promise<string>((resolve) => {
//   resolve('Abc')
// }).then((res) => {
//   console.log(res.length)
// })

// 4.axios的配置选项
// 4.1. 全局的配置
// baseurl 请求根路径
axios.defaults.baseURL = 'http://httpbin.org'
// 请求超时指定事件 断开 毫秒
axios.defaults.timeout = 1000

// 4.2. 每一个请求单独的配置
// 配置根路径后 只需输入对应路劲
// axios.get('/get', {
//   params: {
//     name: 'why',
//     age: 18
//   },
//   timeout: 5000,
//   headers: {}
// })

// 3.post请求
// axios.post(
//   '/post',
//   {
//     data: {
//       name: 'whjy',
//       age: 18
//     }
//   },
//   {
//     data: { www: 'www' },
//     timeout: 5000,
//     headers: {}
//   }
// )

// 5.axios.all -> 多个请求, 一起返回
// axios
//   .all([
//     axios.get('/get', { params: { name: 'why', age: 18 } }),
//     axios.post('/post', { data: { name: 'why', age: 18 } })
//   ])
//   // 使用all发送的多个请求 返回的结果是一个数组
//   .then((res) => {
//     console.log(res[0])
//     console.log(res[1])
//   })

// 6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数

//  use(onFulfilled?: ((value: AxiosResponse<any, any>) => any) | undefined,
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1.给请求添加token
    // 2.isLoading动画
    // config.baseURL = ""
    // config.timeout = ''
    // config.auth = ""
    // 使用当前请求配置 需要返回出去
    console.log('请求成功的拦截')
    return config
  },
  (error) => {
    console.log('请求发送错误')
    return error
  }
)

// fn1: 数据响应成功(服务器正常的返回了数据 20x)
axios.interceptors.response.use(
  (res) => {
    console.log(res)
    // 对响应成功回来的数据做处理
    // 默认axios 额外包装了一层数据
    return res.data
  },
  //  onRejected?: ((error: any) => any) | undefined): number
  (err) => {
    console.log('请求错误信息' + err)
    return err
  }
)
