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

const addEventListener = function () {
  $('.new_btn').click(async _ => {
    const title = $('#title').val() || ''
    const content = $('#content').val() || ''
    const data = {
      title,
      content
    }
    const res = await $post('http://localhost/api/blog/create', JSON.stringify(data))
    console.log('res', res)
    $.toast({
      heading: res.code === 0 ? 'Success' : 'Error',
      icon: res.code === 0 ? 'success' : 'error',
      text: res.message || '新建成功',
      showHideTransition: 'slide',
      position: 'top-center'
    })
    if (res.code === 0) {
      setTimeout(_ => {
        window.location.replace('http://localhost/webapp/index.html')
      }, 3000)
    } else {
      setTimeout(_ => {
        window.location.replace('http://localhost/webapp/login.html')
      }, 3000)
    }
  })
}

async function app () {
  addEventListener()
}

app()
