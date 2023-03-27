import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
export default [
  {
    url: '/api/getDemo',
    method: 'get',
    timeout: 1000,
    response: ({ query }: any) => {
      const data = Mock.mock({
        code: '01',
        body: {
          msg: Mock.mock('@paragraph(1)'),
        },
        message: 'success',
      })
      return data
    },
  },
] as MockMethod[]
