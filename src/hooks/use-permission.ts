import { useStore } from '@/store'
export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  // 拿到权限列表数据
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`

  // name = "coderwhy"
  // !name -> false
  // !!name -> true

  // / !!操作符：
  // 将一个其他类型转换成boolean类型； 类似于Boolean(变量)的方式

  // console.log(!!permissions.find((item) => item === verifyPermission))
  return !!permissions.find((item) => item === verifyPermission)
}
