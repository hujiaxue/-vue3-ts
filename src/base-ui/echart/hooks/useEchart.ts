import * as echarts from 'echarts'

// 导入地图数据
import chinaMapData from '../data/china.json'

// 注册地图数据
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  // 根据 html 元素创建 echar 实列
  const echartInstance = echarts.init(el)

  // 设置属性
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 更新大小  重绘 手动调用
  const updateSize = () => {
    echartInstance.resize()
  }

  // 监听窗口的 resize事件
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
