import path from 'node:path'
import { mergePath, getComponentName } from './utils'

interface CusConfig {
  pagesDir: string
  layoutsDir: string
  routerDir: string
}

/**
 * 获取导入方式
 *
 * @param {boolean} isParent - 是否父级
 * @param {boolean} dynamic - 是否异步路由
 * @param {string} parentKey - 父级路径
 * @param {string} fileName - 文件名
 * @param {CusConfig} cusConfig
 * @return {*}  {string} - 返回导入方式
 */
export function getImport(
  isParent: boolean,
  dynamic: boolean | undefined,
  parentKey: string,
  fileName: string,
  cusConfig: CusConfig
): string {
  let baseLink = mergePath(
    path.posix.relative(
      cusConfig.routerDir,
      cusConfig.pagesDir
    ),
    parentKey,
    fileName
  )
  isParent ? baseLink += '/index.vue' : baseLink += '.vue'

  const varName = getComponentName(baseLink)

  if (typeof dynamic === 'undefined' || dynamic) {
    return `const ${varName} = () => import('${baseLink}');`
  } else {
    return `import ${varName} from '${baseLink}';`
  }
}
