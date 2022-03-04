<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 动态插槽 根据配置创建 -->
          <!--  <template #default="scope"> 拿去eletable 插槽的数据 -->
          <template #default="scope">
            <!-- 定义table的插槽 将element table 中的 作用域插槽 在暴露出去 -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 使用作用域插槽 遍历配置文件 对应的prop字段 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['selectionChange', 'update:page'],

  props: {
    title: { type: String, default: '' },
    listData: { type: Array, required: true },
    listCount: { type: Number, default: 0 },
    propList: { type: Array, required: true },
    showIndexColumn: { type: Boolean, default: false },
    showSelectColumn: { type: Boolean, default: false },
    page: { type: Object, default: () => ({ currentPage: 0, pageSize: 10 }) },
    childrenProps: { type: Object, default: () => ({}) },
    showFooter: { type: Boolean, default: true }
  },

  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', {
        ...props.page,
        pageSize
      })
    }
    return { handleSelectionChange, handleCurrentChange, handleSizeChange }
  }
})
</script>
<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 15px;
  .el-pagination {
    text-align: right;
  }
}
</style>
