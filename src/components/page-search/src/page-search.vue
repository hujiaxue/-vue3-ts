/* eslint-disable @typescript-eslint/ban-ts-comment */
<template>
  <div class="page-search">
    <HyForm v-bind="searchFormConfig" v-model="formData">
      <!-- 暴露上下两个插槽 -->
      <template v-slot:header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="Remove" @click="handleResetClick">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </HyForm>
  </div>
</template>
<script lang="ts">
import HyForm from '@/base-ui/form'
import { defineComponent, ref } from 'vue'
import { Remove, Search } from '@element-plus/icons-vue'
export default defineComponent({
  emits: ['resetBtnClick', 'queryBtnClick'],
  components: {
    HyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  // 数据层
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定 // 1.优化一: formData中的属性应该动态来决定

    const formItems = props.searchFormConfig?.formItems ?? []
    // 遍历配置文件
    const formOriginData: any = {}
    // 置空操作
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    // 将要绑定的数据 转换成响应式的
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.优化三: 当用户点击搜索

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      Search,
      Remove,
      handleResetClick,
      handleQueryClick,
      formData
    }
  }
})
</script>
<style lang="less" scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
