const {exec} = require("./../db")

const getList = (nickname,keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(nickname) {
    sql += `and nickname='${nickname}' `
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' or '%${keyword}%'`
  }
  sql += 'order by createtime desc;'
  return exec(sql)
}

const getDetailById = id => {
  let sql = `select * from blogs where 1=1 `
  if(id) {
    sql += `and id=${id} `
  }
  sql += 'order by createtime desc;'
  return exec(sql)
}

const create = data =>{
  let sql = `insert into blogs (title,content,createtime,nickname) values ('${data.title}','${data.content}','${Date.now()}','${data.nickname}');`
  return exec(sql).then(result=>{
    return {
      id: result.insertId
    }
  })
}

const update = (data) => {
  let props = ''
  if(data.title) {
    props += `title='${data.title}' `
  }
  if(data.content) {
    if(data.title) {
      props += ','
    }
    props += `content='${data.content}' `
  }
  let sql = `update blogs set ${props} where id=${data.id};`
  return exec(sql).then(result=>{
    return {
      msg: result.affectedRows > 0 ? '操作成功' : '服务器错误'
    }
  })
}

const del = ({id,nickname}) => {
  let sql = `delete from blogs where id=${id} and nickname='${nickname}'`
  return exec(sql).then(result=>{
    return {
      msg: result.affectedRows > 0 ? '操作成功' : '服务器错误'
    }
  })
}

module.exports = {
  getList,
  getDetailById,
  create,
  update,
  del
}