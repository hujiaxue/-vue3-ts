import dayjs from 'dayjs'
// 导入插件
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

// 默认格式
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 传入要格式化的字符串 及其对应的格式
export function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

// export function formatTimestamp(timestamp: number, format: string = DATE_TIME_FORMAT) {
//   return ''
// }
