const fs = require('fs')
const { join } = require('path')
const { dFormat } = require('./format')

// 写入 stream
const createWriteStream = (filename) => {
  const fullFileName = join(__dirname, '../log/', filename)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a' // 追加
  })
  return writeStream
}
// 访问日志
const accessWriteStream = createWriteStream('access.log')
const errorWriteStream = createWriteStream('error.log')
const runtimeWriteStream = createWriteStream('runtime.log')

// 写日志
const writeLog = (writeStream, log) => {
  writeStream.write(`[${dFormat('yyyy-MM-dd hh:mm:ss')}]    ` + log + '\n') // 写入日志
}

const access = log => {
  writeLog(accessWriteStream, log)
}

const error = log => {
  writeLog(errorWriteStream, log)
}

const runtime = log => {
  writeLog(runtimeWriteStream, log)
}

module.exports = {
  access,
  error,
  runtime
}
