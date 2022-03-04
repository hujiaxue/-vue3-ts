// 封装axios
import axios from 'axios'
// axios 的实列类型
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
const DEAFULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  // 拦截器可选类型
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器

    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    // if (config.showLoading === false) {
    //   this.showLoading = config.showLoading
    // }
    // this.showLoading = DEAFULT_LOADING
    // 保存基本信息
    this.interceptors = config.interceptors

    // 给当前实例添加拦截器 instance是创建的axios实列
    this.instance.interceptors.request.use(
      // 实例instance
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 请求开始 打开loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      }
    )

    // 响应
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器: 响应成功拦截')
        // 将loading移除
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 响应失败拦截')
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        // 将loading移除
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404的错误~')
        }

        return err
      }
    )
  }
  // 封装方法

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理 如果单个请求传来的配置有拦截器 将其取出进行回调 并将当前参数传入
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      // 默认any类型的参数 axios.request()  调用实例发送数据
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理

          if (config.interceptors?.responseInterceptor) {
            // 单个请求的响应拦截 处理
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
