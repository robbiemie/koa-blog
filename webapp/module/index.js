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
        resolve(res.data)
      } else {
        resolve(res)
      }
    })
  })
}

function renderListItem (info) {
  const el = `
    <div class="item">
      <h2 class="title" data-id=${info.id}>${info.title}</h2>
      <div class="content">${info.content}</div>
      <div>
      <span class="author">作者: ${info.nickname}</span>
      <span class="edit" data-id=${info.id}>编辑</span>
      <span class="delete" data-id=${info.id}>删除</span>
      </div>
    </div>
  `
  return el
}

function renderList (list) {
  return list.map(item => {
    return renderListItem(item)
  })
}

function addEventListener () {
  $('.title').click(e => {
    const id = $(e.target).attr('data-id')
    window.location.href = `http://localhost/webapp/detail.html?id=${id}`
  })

  $('.edit').click(e => {
    const id = $(e.target).attr('data-id')
    window.location.href = `http://localhost/webapp/edit.html?id=${id}`
  })

  $('.delete').click(function () {
    const id = $(this).attr('data-id')
    $.confirm({
      title: '',
      boxWidth: '200px',
      useBootstrap: false,
      content: '确认删除当前博客？',
      autoClose: 'cancel|8000',
      draggable: true,
      buttons: {
        confirm: {
          text: 'Yes',
          async action () {
            const data = {
              id
            }
            const res = await $post('http://localhost/api/blog/delete', JSON.stringify(data))
            $.toast({
              heading: res.code === 0 ? 'Success' : 'Error',
              icon: res.code === 0 ? 'success' : 'error',
              text: res.message || '新建成功',
              showHideTransition: 'slide',
              position: 'top-center'
            })
            if (res.code === 0) {
              setTimeout(_ => {
                window.location.reload()
              }, 3000)
            } else {
              setTimeout(_ => {
                window.location.replace('http://localhost/webapp/login.html')
              }, 3000)
            }
          }
        },
        cancel: {
          text: 'No',
          action () {
            // console.log('取消')
          }
        }
      }
    })
  })
}

async function app () {
  const list = await $get('http://localhost/api/blog/list')
  const root = $('#app')
  const elList = renderList(list)
  root.append(elList)
  addEventListener()
}

app()
