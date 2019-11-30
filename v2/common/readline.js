const fs = require('fs')
const { join } = require('path')
const readline = require('readline')

const getFileLine = filename => {
  const fullFilename = join(__dirname, '../log/', filename)
  // 创建 read stream
  const readStream = fs.createReadStream(fullFilename)

  // 创建 raedline 对象
  const rl = readline.createInterface({
    input: readStream
  })

  let totalNum = 0

  // 逐行读取
  rl.on('line', lineData => {
    if (!lineData) return
    // 记录总行数
    totalNum++
  })

  // 监听读取完成
  readStream.on('close', _ => {
    console.log('日志总行数', totalNum)
  })
}

module.exports = {
  getFileLine
}
