import moment from 'moment'

// 将时间戳转换为指定格式
export const datetime = (timestamp) => {
  if (timestamp) {
    return moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return ''
  }
}

// 将时间戳转换为指定格式
export const hourtime = (timestamp) => {
  return moment.unix(timestamp).format('HH:mm:ss')
}

// 将Date对象的实例转化为时间戳,秒
export const getSeconds = str => str ? moment(str).unix() : ''

// 返回当前时间后days天的格式化后的字符串
export const addDays = days => {
  return datetime(getSeconds(new Date()) + days * 24 * 60 * 60 || 0)
}

// 奖YYYY-MM-DD HH:mm:ss转换为时间戳
export const dateStr2TimeStamp = ds => {
  return new Date(ds).getTime()
}

export default {
  datetime,
  hourtime,
  getSeconds,
  addDays,
  dateStr2TimeStamp
}
