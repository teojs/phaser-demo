import fs from 'node:fs'
import path from 'node:path'
import { isTsFile, isEmptyFile } from './src/utils'
import initApi from './src/initApi'
import initTemplate from './src/initTemplate'

interface ConfigEnv {
  mode: string
  command: 'serve' | 'build'
}

interface CusConfig {
  serviceDir: string
  apisDir: string
}

const autoApi = (cusConfig: CusConfig) => ({
  name: 'auto:api',
  async config(_config: any, { command }: ConfigEnv) {
    const apisDir = cusConfig.apisDir || 'src/service/apis'
    await initApi(cusConfig)
    if (command === 'serve') {
      const rootPath = path.join(process.cwd(), apisDir)
      let timer: NodeJS.Timeout = null
      fs.watch(
        rootPath,
        { recursive: true },
        (eventType, fileName) => {
          const filePath = path.posix.join(rootPath, fileName)
          if (isTsFile(filePath)) {
            if (isEmptyFile(filePath)) {
              initTemplate(filePath)
            }
          }

          if (eventType === 'rename') {
            clearTimeout(timer)
            timer = setTimeout(() => {
              initApi(cusConfig)
            }, 300)
          }
        })
    }
  },
})

export default autoApi
