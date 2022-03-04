import { ref } from 'vue'

import PageModel from '@/components/page-model'

type CallbackFn = (item?: any) => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn): any {
  // 组件实列
  const pageModalRef = ref<InstanceType<typeof PageModel>>()
  const defaultInfo = ref({})
  // 调用子组件实列 打开弹窗
  // 添加
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 单个组件的回调方法
    newCb && newCb()
  }

  // 编辑
  const handleEditData = (item: any) => {
    // 数据回显
    defaultInfo.value = { ...item }

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
