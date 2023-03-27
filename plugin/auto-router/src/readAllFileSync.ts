import fs from 'node:fs'
import path from 'node:path'
import { isVue, isDir } from './utils'

/**
 * 读取指定目录下的所有Vue文件
 *
 * @param {string} baseDir
 * @return {*}  {string[]}
 */
export function readAllFileSync(baseDir: string): string[] {
  const allFiles: string[] = []
  const readdirSync = (dir: string) => {
    const fullDir = path.join(process.cwd(), dir)
    const files = fs.readdirSync(fullDir)
    files.forEach(file => {
      const fullFilePath = path.posix.join(dir, file)
      if (isVue(fullFilePath)) {
        allFiles.push(fullFilePath)
      } else if (isDir(fullFilePath)) {
        readdirSync(fullFilePath)
      }
    })
  }
  readdirSync(baseDir)
  return allFiles
}
