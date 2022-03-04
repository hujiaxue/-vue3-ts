<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
// 类型
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义props
// withDefaults 包裹defineProps可以设置默认属性    defineProps 定义props属性的方法
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  // 默认属性
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  // 传入 ref 的绑定 得到 echa实列
  const { setOptions } = useEchart(echartDivRef.value!)

  // 监听 自动收集依赖
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>
<style lang="less" scoped></style>
