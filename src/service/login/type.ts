//  账号密码
export interface IAccount {
  name: string
  password: string
}

// 手机验证码类型
export interface IDataType<T = any> {
  code: number
  data: T
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
