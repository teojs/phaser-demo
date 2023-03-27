/* eslint-disable no-console */

import path from 'node:path'
import fs from 'node:fs'
import { isVue, isEmptyFile } from './src/utils'
import initRoutes from './src/initRoutes'
import initTemplate from './src/initTemplate'

interface ConfigEnv {
  mode: string
  command: 'serve' | 'build'
}

interface CusConfig {
  pagesDir: string
  layoutsDir: string
  routerDir: string
}

const autoRouter = (cusConfig: CusConfig) => ({
  name: 'auto:router',
  async config(_config: any, { command }: ConfigEnv) {
    console.log('==正在初始化路由==')
    console.time('==初始化路完毕，耗时==')
    await initRoutes(cusConfig)
    console.timeEnd('==初始化路完毕，耗时==')

    if (command === 'serve') {
      const pagesDir = cusConfig.pagesDir || 'src/pages'
      const rootPath = path.join(process.cwd(), pagesDir)
      fs.watch(rootPath, { recursive: true }, (eventType, fileName) => {
        const filePath = path.join(rootPath, fileName)
        if (isVue(filePath)) {
          if (isEmptyFile(filePath)) {
            initTemplate(filePath)
          }
          initRoutes(cusConfig)
        } else {
          initRoutes(cusConfig)
        }
      })
    }
  },
})

export default autoRouter
