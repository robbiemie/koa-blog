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
    window.location.href = `http://localhost/v1/webapp/detail.html?id=${id}`
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
