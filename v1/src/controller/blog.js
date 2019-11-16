const getList = (uid,keyword) => {
  return [{
    id: 1,
    title: "标题A",
    content: "内容AAA",
    timestamp: Date.now(),
    uid: "5007000",
    username: "robbieyang1"
  },{
    id: 2,
    title: "标题 B",
    content: "内容 BBB",
    timestamp: Date.now(),
    uid: "5007001",
    username: "robbieyang2"
  },{
    id: 3,
    title: "标题C",
    content: "内容 CCC",
    timestamp: Date.now(),
    uid: "5007002",
    username: "robbieyang3"
  }]
}

const getDetailById = id => {
  return {
    id: 1,
    title: "标题A",
    content: "内容AAA",
    timestamp: Date.now(),
    uid: "5007000",
    username: "robbieyang1"
  }
}

const create = data =>{
  console.log('create blog', data)
  return {
    id: 4
  }
}

const update = (id,data) => {
  console.log('update blog', id, data)
  return {
    id
  }
}

const delet = (id) => {
  console.log("delete id", id)
  return {
    id
  }
}

module.exports = {
  getList,
  getDetailById,
  create,
  update,
  delet
}