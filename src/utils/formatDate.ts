import dayjs from 'dayjs'

export type FormatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format: string,
  invalidText?: string
) => string

const formatDate: FormatDate = (date, format, invalidText) => {
  if (!dayjs(date).isValid()) return invalidText || '-'
  return dayjs(date).format(format)
}

export default formatDate
