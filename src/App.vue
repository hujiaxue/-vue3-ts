<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import {} from './service/request/'
export default defineComponent({
  name: 'App',
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style lang="less"></style>
