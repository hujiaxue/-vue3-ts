import { RouteRecord } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecord[] {
  const routes: RouteRecord[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecord[] = []
  // 使用require  要遍历的路劲  是否递归调用  正则匹配
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // console.log(routeFiles)

  routeFiles.keys().forEach((key) => {
    // key  = ./analysis/dashboard/dashboard.ts
    // console.log(key)
    // route = /router/main/analysis/aabddhors/dashboard
    const route = require('../router/main' + key.split('.')[1])
    // console.log(route)
    // 路由文件expoet的 对象 {name： path ： component}
    allRoutes.push(route.default)
    // console.log(allRoutes)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 当前type不等于1 子节点
        // 将传来的menus数组进行遍历 找到子节点为2 的 和已经定义好的路由对象遍历进行匹配
        // 得到的值将其梵高routes中  找到的就是该用户所拥有的路由对象
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 初始化添加菜单时 将第一个路由对象添加到firstMenu
        if (!firstMenu) {
          // console.log(!firstMenu)

          firstMenu = menu
          // console.log(!firstMenu)
          //  '/main/analysis/overview'
          // console.log(firstMenu)
        }
      } else {
        // 如果当前type 为1 递归调用
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 面包屑数据  当前路由及其父路由信息
// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrumbs: IBreadcrumb[] = []

//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }

//   return breadcrumbs
// }

// // /main/system/role  -> type === 2 对应menu
// 根据当前路径去获取对应的路由对象
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

// 获取type === 3 的数据  permission: "system:users:create"
export function mapMenusToPermissions(userMenus: any[]) {
  const permission: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permission
}

export function menuMapLeafKeys(menuList: any) {
  const leftKeys: number[] = []

  const _recurGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurGetLeaf(menuList)
  return leftKeys
}

export { firstMenu }
