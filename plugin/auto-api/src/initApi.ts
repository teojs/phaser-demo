/* eslint-disable no-console */

import fs from 'node:fs'
import path from 'node:path'
import { mergePath, getVarName, crossbar2Case } from './utils'
import { readAllFileSync } from './readAllFileSync'
import _ from 'lodash'
import format from 'prettier-eslint'

interface DirStructure {
  filePath?: string
  index?: DirStructure
}

interface CusConfig {
  serviceDir: string
  apisDir: string
}

export default async function initRoutes(cusConfig: CusConfig) {
  console.log('\n==正在初始化接口...')
  console.time('==初始化接口耗时：')

  // 获取全部vue文件并格式化结构关系
  const files = readAllFileSync(cusConfig.apisDir)
  const dirStructure: DirStructure = {}
  let apiImport = ''
  files.forEach((file) => {
    const regExp = new RegExp(`${cusConfig.apisDir}/(.+?).ts`)
    const key = file.match(regExp)[1].replace(/\//g, '.')
    _.set(dirStructure, crossbar2Case(key), `==typeof ${getVarName(key)}==`)

    apiImport += `import ${getVarName(key)} from '${file
      .replace('src', '@')
      .replace('.ts', '')}'\n`
  })

  const apisDeclareContent = `
    /* eslint-disable no-unused-vars */
    /* !!!请勿修改此文件!!! */
    import { ComponentCustomProperties } from 'vue'
    ${apiImport}
    
    declare module '@vue/runtime-core' {
      declare interface ComponentCustomProperties {
        $api: ${JSON.stringify(dirStructure, null, 2)}
      }
    }
    
  `.replace(/=="|"==/g, '')

  const formatFile = await format({
    text: apisDeclareContent,
    filePath: path.join(process.cwd(), '.eslintrc.js'),
  })
  const apisDeclareFile = mergePath(
    process.cwd(),
    cusConfig.serviceDir,
    'types/api.d.ts'
  )
  fs.writeFileSync(apisDeclareFile, formatFile)
  console.log('==接口初始化完毕，文件位置：', apisDeclareFile)
  console.timeEnd('==初始化接口耗时：')
}
