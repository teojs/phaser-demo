import http from './axiosConfig'
import _ from 'lodash'
import { App } from 'vue'

/**
 * 转首字母大写
 *
 * @param {string} word
 * @return {*}  {string}
 */
export function firstUpperCase(word: string): string {
  if (typeof word !== 'string') return ''
  return word.replace(/^[a-z]/, (match) => match.toUpperCase())
}

/**
 * 横杆转驼峰
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function crossbar2Case(str: string): string {
  if (!/-/.test(str)) return str
  return str
    .split('-')
    .map((o, i) => {
      if (!i) return o
      return firstUpperCase(o)
    })
    .join('')
}

// 自动注册/src/service/apis的所以接口

interface IApis {
  $http: typeof http
}

const apis: IApis = {
  $http: http,
}
const allApis = import.meta.globEager('./apis/**/*.ts')
for (const key in allApis) {
  const path = key.match(/\.\/apis\/(.+?)\.ts/)![1].replace(/\//g, '.')
  _.set(apis, crossbar2Case(path), allApis[key].default)
}

// 自动注册/src/service/apis的所以接口

export { apis }

export default {
  install: (app: App) => {
    app.config.globalProperties.$api = apis
  },
}
