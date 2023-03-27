export {}

declare module 'vue-router' {
  export interface RouteMeta {
    // 页面标题
    title: string
    // 菜单栏排序
    sort?: number
    // 是否隐藏掉
    hidden?: boolean
    // 校验授权
    requiresAuth?: boolean
    // 设置菜单栏icon
    icon?: string
    // 是否缓存页面
    keepAlive?: boolean
    // 是否菜单栏
    isMenu?: boolean
    // 异步组件，默认true
    dynamic?: boolean
  }
}
