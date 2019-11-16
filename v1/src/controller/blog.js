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

module.exports = {
  getList
}