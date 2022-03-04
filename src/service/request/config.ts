// 1.方式一: 手动的切换不同的环境(不推荐)

// 定义不同环境下的变量  然后手动进行 修改 缺点 忘记
// const BASE_URL = 'http://www.baidu.com'
// const BASE_NAME = 'hujia'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

// 2.根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

let BASE_URL = ''
const TIME_OUT = 1000

// 如果当前是开发环境
if (process.env.NODE_ENV === 'development') {
  // 设置
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

// 导出
export { BASE_URL, TIME_OUT }
