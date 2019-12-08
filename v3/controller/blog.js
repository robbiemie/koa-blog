const xss = require('xss')
const { exec } = require('./../db')

const getList = async (nickname, keyword) => {
  let sql = 'select * from blogs where 1=1 '
  if (nickname) {
    sql += `and nickname='${nickname}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' or '%${keyword}%'`
  }
  sql += 'order by createtime desc;'
  const result = await exec(sql)
  return result
}

const getDetailById = async id => {
  let sql = 'select * from blogs where 1=1 '
  if (id) {
    sql += `and id=${id} `
  }
  sql += 'order by createtime desc;'
  const result = await exec(sql)
  return result
}

const create = async data => {
  const sql = `insert into blogs (title,content,createtime,nickname) values ('${xss(data.title)}','${xss(data.content)}','${Date.now()}','${data.nickname}');`
  const result = await exec(sql)
  let resData = {}
  if (result.insertId) {
    resData = {
      code: 0,
      id: result.insertId,
      msg: '操作成功'
    }
  } else {
    resData = {
      code: -104,
      msg: '操作失败'
    }
  }
  return resData
}

const update = async (data) => {
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
  const result = await exec(sql)
  let resData = {}
  if (result.affectedRows > 0) {
    resData = {
      code: 0,
      msg: '操作成功'
    }
  } else {
    resData = {
      code: -104,
      msg: '操作失败'
    }
  }
  return resData
}

const del = async ({ id, nickname }) => {
  const sql = `delete from blogs where id=${id}`
  const result = await exec(sql)
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
}

module.exports = {
  getList,
  getDetailById,
  create,
  update,
  del
}
