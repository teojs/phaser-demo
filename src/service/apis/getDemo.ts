import http from '@/service/axiosConfig'
import { IAxiosResponseData } from '@/service/types/axios'
import type { AxiosRequestConfig } from 'axios'

// 定义请求入参，?号表示可选
interface IRequestConfig extends AxiosRequestConfig {
  params?: {
    test: number
  }
  data?: {
    test: string
  }
}

// 定义返回的数据结构，body里的内容
interface IAxiosResponseDataBody {
  msg: string
}

/**
 * 从mock里面获取一句话
 *
 * @export
 * @param {IRequestConfig} ctx
 * @return {*}  {Promise<IAxiosResponseData<IAxiosResponseDataBody>>}
 */
export default function api(
  ctx: IRequestConfig
): Promise<IAxiosResponseData<IAxiosResponseDataBody>> {
  return http<IAxiosResponseDataBody>({
    method: 'get',
    url: '/api/getDemo',
    ...ctx,
  })
}
