// 这里只放一些全局变量
import _ from 'lodash'
import { App } from 'vue'
import { message, notification, dialog, loadingBar } from './createDiscreteApi'
import dayjs from 'dayjs'
import invalidDate from './invalidDate'
import formatDate from './formatDate'

dayjs.extend(invalidDate)

export default {
  install: (app: App) => {
    app.config.globalProperties.$_ = _

    // 注意，使用这里的接口是不会实时切换主题的
    // vue里面推荐使用mixin中的接口
    app.config.globalProperties.$message = message
    app.config.globalProperties.$notification = notification
    app.config.globalProperties.$dialog = dialog
    app.config.globalProperties.$loadingBar = loadingBar

    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$formatDate = formatDate
  },
}
