const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'runtime.log')

// 写入文件
const content = '\n新写入内容\n'
const opt = {
  flag: 'a' // 追加写入。覆盖用 'w'
}

fs.writeFile(fileName, content, opt, err => {
  if (err) throw err
})

// 读取文件
fs.readFile(fileName, (err, data) => {
  if (err) throw err
  // data: Buffer 数据类型
  console.log(data.toString())
})

// 判断文件是否存在
fs.stat(fileName, (err, stats) => {
  if (err) {
    console.error('文件不存在')
    return new Error(err)
  }
  console.log('exist', stats)
})
