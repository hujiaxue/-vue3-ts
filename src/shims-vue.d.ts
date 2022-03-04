/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 类型限制 和 推导的作用
  // DefineComponent vue内部定义的单组件构成类型
  // component 使用 DefineComponent类型创建的实列
  const component: DefineComponent<{}, {}, any>
  // 将'*.vue 文件解析成是  DefineComponent类型创建的实列 component
  export default component
}

// 类型声明文件
declare let $store: any
declare let $filters: function
declare module '*.json'
