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
  $('.login_btn').click(async _ => {
    const uname = $('#uname').val() || ''
    const pwd = $('#passwd').val() || ''
    const data = {
      username: uname,
      password: pwd
    }
    const res = await $post('http://localhost/api/blog/login', JSON.stringify(data))
    $.toast({
      heading: res.code === 0 ? 'Success' : 'Error',
      icon: res.code === 0 ? 'success' : 'error',
      text: res.message || '登录失败，请稍后重试',
      showHideTransition: 'slide',
      position: 'top-center'
    })
    if (res.code === 0) {
      window.location.replace('http://localhost/v1/webapp/index.html')
    }
  })
}

async function app () {
  addEventListener()
}

app()
