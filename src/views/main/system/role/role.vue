<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>

    <PageModal
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      pageName="role"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, computed } from 'vue'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'

// 类型
import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModel } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 回调传入当前目录对象
    const editCallback = (item: any) => {
      // 获取子节点数据  item编辑时的回调 page-model 通过作用域插槽传入

      const leafkeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        // 设置回显
        // console.log(elTreeRef.value)

        elTreeRef.value?.setCheckedKeys(leafkeys, false)
      })
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
      undefined,
      editCallback
    )

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    // tree树点击的回调
    const handleCheckChange = (data: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]

      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,

      elTreeRef,
      menus,
      otherInfo,
      handleCheckChange
    }
  }
})
</script>

<style scoped></style>
