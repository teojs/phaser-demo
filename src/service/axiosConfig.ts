import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import loading from '@/utils/loading'
import Router from '@/router'
import _ from 'lodash'
import { IAxiosResponseData } from './types/axios'

const axiosInstance = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 120000,
  validateStatus: status => status >= 200 && status < 300,
})

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers!.Authorization = token
  }

  // 自动打开 loading
  if (config.loading) {
    switch (typeof config.loading) {
      case 'string':
        config.loadingCallBack = loading({ target: config.loading as string })
        break
      case 'object':
        config.loadingCallBack = loading({ el: config.loading as HTMLElement })
        break
      case 'undefined':
        break
      default:
        config.loadingCallBack = loading()
        break
    }
  }
  return config
})

axiosInstance.interceptors.response.use(
  async response => {
    response.config.loadingCallBack && response.config.loadingCallBack.close()

    if (response.status === 403) {
      // token 过期的情况
      localStorage.removeItem('token')
      Router.push({
        path: '/login',
      })
      return Promise.reject(response.data)
    }

    if (_.inRange(response.status, 200, 299)) {
      if (response.config.responseType === 'blob') {
        if ('content-disposition' in response.headers) {
          const file = response.data as Blob
          const reader = new FileReader()
          await new Promise(resolve => {
            reader.onload = resolve
            reader.readAsText(file)
          })
          try {
            return JSON.parse(reader.result as string)
          } catch (error) {
            return {
              code: '01',
              file,
              name: response.headers['content-disposition'].split('=')[1],
            }
          }
        }
        return {
          code: '02',
          message: '无法获取文件',
          body: null,
        }
      } else {
        return response.data
      }
    }

    // 这里可以弹出错误提示
    return {
      code: response.status,
      message: response.statusText,
      body: null,
    }
  },
  (error: AxiosError) => {
    if ('config' in error) {
      error?.config?.loadingCallBack?.close()
      // 这里可以弹出错误提示
    }
    return {
      code: error.code,
      message: error.message,
      body: null,
    }
  }
)

/**
 * 封装好的Http请求
 *
 * @export
 * @template D
 * @param {AxiosRequestConfig} config
 * @return {*}  {Promise<IAxiosResponseData<D>>}
 */
export default function http<D>(
  config: AxiosRequestConfig
): Promise<IAxiosResponseData<D>> {
  return axiosInstance(config) as unknown as Promise<IAxiosResponseData<D>>
}
