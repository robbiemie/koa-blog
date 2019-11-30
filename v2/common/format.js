const dFormat = fmt => {
  var o = {
    'M+': new Date().getMonth() + 1, // 月份
    'd+': new Date().getDate(), // 日
    'h+': new Date().getHours(), // 小时
    'm+': new Date().getMinutes(), // 分
    's+': new Date().getSeconds(), // 秒
    'q+': Math.floor((new Date().getMonth() + 3) / 3), // 季度
    S: new Date().getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
module.exports = {
  dFormat
}
