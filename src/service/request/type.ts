// axios 的 config类型

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYRequestInterceptors<T = AxiosResponse> {
  // 请求拦截器类型
  requestInterceptor?: (config: AxiosRequestConfig | any) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // 响应拦截器类型
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
// 将导入的以及定义的请求和响应拦截器类型 合并
// axios.create(config = HYRequestConfig)

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
