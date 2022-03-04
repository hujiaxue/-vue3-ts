<template>
  <div class="nav-header">
    <el-icon :size="30">
      <component class="fold-menu" :is="iconName" @click="handleFoldClick"></component>
    </el-icon>
    <div class="content">
      <HYbreadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HYbreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import UserInfo from './user-info.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    HYbreadcrumb,
    UserInfo
  },
  setup(props, context) {
    // 控制图标 及伸缩
    const iconName = ref('Fold')
    const isFold = ref(false)
    const handleFoldClick = () => {
      // 更改图标
      isFold.value = !isFold.value
      if (isFold.value === false) {
        iconName.value = 'Fold'
      } else {
        iconName.value = 'Expand'
      }
      context.emit('foldChange', isFold.value)
    }

    // 面包屑的数据: [{name: , path: }]
    const store = useStore()
    // 将需要响应式的数据梵高计算属性中
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      iconName,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
