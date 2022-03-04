import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  // 动态获取 数据 进行拼接
  getters: {
    // 计算属性返回一个函数  可以接收参数
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    },
    pageGoodsCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    },
    pageMenuCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    }
  },
  mutations: {
    // 用户列表
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    // 用户列表总数
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    // 角色数据
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    // 角色列表总数
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    // 商品列表
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    // 商品列表总数
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    // 菜单列表
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    // 菜单总数
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  actions: {
    async getPageListAction(context, payload: any) {
      // console.log(payload.pageUrl)
      // console.log(payload.queryInfo)
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data

      // 动态保存数据
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      context.commit(`change${changePageName}List`, list)
      context.commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageDataAction(context, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `${pageName}/${id}`

      //  2.调用删除网络请求
      await deletePageData(pageUrl)

      // 3.重新请求最新的数据
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 添加
    async createPageDataAction(context, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      // console.log(editData)
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
