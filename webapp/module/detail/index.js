const $get = async function (url, data) {
  return new Promise(resolve => {
    $.ajax({
      url,
      method: 'GET'
    }).done(res => {
      if (res.code === 0) {
        resolve(res.data[0])
      } else {
        resolve(res)
      }
    })
  })
}

const getParamter = function (key) {
  const search = window.location.search.slice(1)
  return (search.split('&').reduce((cur, next) => {
    const k = next.split('=')[0]
    const v = next.split('=')[1]
    cur[k] = v
    return cur
  }, {}))[key] || ''
}
const renderTitle = function (data) {
  $('#title').val(data.title)
}
const renderContent = function (data) {
  $('#content').val(data.content)
}

async function app () {
  const res = await $get(`http://localhost/api/blog/detail?id=${getParamter('id')}`)
  renderTitle(res)
  renderContent(res)
  console.log('list', res)
}

app()
