<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center destroy-on-close>
      <HyForm v-bind="modalConfig" v-model="formData" />
      <slot></slot>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm
  },
  props: {
    modalConfig: { type: Object, required: true },
    defaultInfo: { type: Object, default: () => ({}) },
    pageName: { type: String, require: true },
    otherInfo: { type: Object, default: () => ({}) }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    const title = computed(() => {
      return props.defaultInfo.length ? '修改数据' : '添加数据'
    })

    // 对配置数据需要双向绑定数据取出来

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    // 添加
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑用户
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 添加
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: {
            ...formData.value,
            ...props.otherInfo
          }
        })
      }
    }

    return {
      title,
      formData,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>
<style lang="less" scoped></style>
