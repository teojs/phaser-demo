import fs from 'node:fs'
import { parse } from 'vue/compiler-sfc'
import { isEmptyFile } from './utils'
import initTemplate from './initTemplate'

interface RouteMeta {
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
  dynamic: boolean
}

interface RouteInfo {
  meta?: RouteMeta
}

/**
 * 读取自定义路由信息
 *
 * @param {string} filePath
 * @return {*}  {RouteInfo}
 */
export function readRouteInfo(filePath: string): RouteInfo {
  try {
    // 读取自定义的路由信息
    if (isEmptyFile(filePath)) {
      initTemplate(filePath)
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const customBlocks = parse(fileContent).descriptor.customBlocks
    return JSON.parse(customBlocks.filter((o) => o.type === 'route')[0].content)
  } catch {
    return {}
  }
}
