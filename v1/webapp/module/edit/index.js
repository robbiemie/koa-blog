const $post = async function (url, data) {
  return new Promise(resolve => {
    $.ajax({
      url,
      data,
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json'
    }).done(res => {
      if (res.code === 0) {
        resolve(res)
      } else {
        resolve(res)
      }
    })
  })
}
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

const addEventListener = function () {
  $('.edit_btn').click(async _ => {
    const title = $('#title').val() || ''
    const content = $('#content').val() || ''
    const data = {
      id: getParamter('id'),
      title,
      content
    }
    const res = await $post('http://localhost/api/blog/update', JSON.stringify(data))
    $.toast({
      heading: res.code === 0 ? 'Success' : 'Error',
      icon: res.code === 0 ? 'success' : 'error',
      text: res.message || '新建成功',
      showHideTransition: 'slide',
      position: 'top-center'
    })
    if (res.code === 0) {
      setTimeout(_ => {
        window.location.replace('http://localhost/v1/webapp/index.html')
      }, 3000)
    } else {
      setTimeout(_ => {
        window.location.replace('http://localhost/v1/webapp/login.html')
      }, 3000)
    }
  })
}

async function app () {
  const res = await $get(`http://localhost/api/blog/detail?id=${getParamter('id')}`)
  renderTitle(res)
  renderContent(res)
  addEventListener()
}

app()
