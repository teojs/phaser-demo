import { PluginFunc } from 'dayjs'
const invalidDate: PluginFunc = (option, dayjsClass, dayjsFactory) => {
  const proto = dayjsClass.prototype
  const oldFormat = proto.format

  dayjsClass.prototype.format = function(param) {
    if (this.isValid()) {
      return oldFormat.bind(this)(param)
    }
    return ''
  }
}

export default invalidDate
