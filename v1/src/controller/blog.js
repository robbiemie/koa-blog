const xss = require('xss')
const { exec } = require('./../db')

const getList = (nickname, keyword) => {
  let sql = 'select * from blogs where 1=1 '
  if (nickname) {
    sql += `and nickname='${nickname}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' or '%${keyword}%'`
  }
  sql += 'order by createtime desc;'
  return exec(sql)
}

const getDetailById = id => {
  let sql = 'select * from blogs where 1=1 '
  if (id) {
    sql += `and id=${id} `
  }
  sql += 'order by createtime desc;'
  return exec(sql)
}

const create = data => {
  const sql = `insert into blogs (title,content,createtime,nickname) values ('${xss(data.title)}','${xss(data.content)}','${Date.now()}','${data.nickname}');`
  return exec(sql).then(result => {
    let data = {}
    if (result.insertId) {
      data = {
        code: 0,
        id: result.insertId,
        msg: '操作成功'
      }
    } else {
      data = {
        code: -104,
        msg: '操作失败'
      }
    }
    return {
      msg: data
    }
  })
}

const update = (data) => {
  let props = ''
  if (data.title) {
    props += `title='${xss(data.title)}' `
  }
  if (data.content) {
    if (data.title) {
      props += ','
    }
    props += `content='${xss(data.content)}' `
  }
  const sql = `update blogs set ${props} where id=${data.id};`
  return exec(sql).then(result => {
    let data = {}
    if (result.affectedRows > 0) {
      data = {
        code: 0,
        msg: '操作成功'
      }
    } else {
      data = {
        code: -104,
        msg: '操作失败'
      }
    }
    return data
  })
}

const del = ({ id, nickname }) => {
  const sql = `delete from blogs where id=${id}`
  return exec(sql).then(result => {
    let data = {}
    if (result.affectedRows > 0) {
      data = {
        code: 0,
        msg: '操作成功'
      }
    } else {
      data = {
        code: -104,
        msg: '操作失败'
      }
    }
    return data
  })
}

module.exports = {
  getList,
  getDetailById,
  create,
  update,
  del
}
