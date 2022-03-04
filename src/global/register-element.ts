// 全局的element css
// import 'element-plus/lib/theme-chalk/base.css'
import { App } from 'vue'
import * as ElIconModules from '@element-plus/icons-vue'
// import {
//   // ElButton,
//   // ElCheckbox,
//   // ElForm,
//   // ElFormItem,
//   // ElInput,
//   // ElLink,
//   // ElRadio,
//   // ElTabPane,
//   // ElTabs,
//   ElIcon
// } from 'element-plus'

// const components = [
//   // ElButton,
//   // ElForm,
//   // ElFormItem,
//   // ElInput,
//   // ElRadio,
//   // ElTabs,
//   // ElTabPane,
//   // ElCheckbox,
//   // ElLink
// ]

export default function (app: App): void {
  // for (const component of components) {
  //   app.component(component.name, component)
  // }

  // 统一注册Icon图标
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }
}
