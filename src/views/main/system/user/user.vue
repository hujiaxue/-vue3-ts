<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <PageModel
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      passwordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      // 拿到配置文件中的部门数据
      const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')
      // 部门数据的选项options中添加数据
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      // 拿到配置文件中的角色数据
      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })
    // 3.调用hook获取公共变量和函数 3

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
      newCallback,
      editCallback
    )

    return {
      contentTableConfig,
      searchFormConfig,
      modalConfigRef,

      handleResetClick,
      handleQueryClick,

      pageContentRef,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
