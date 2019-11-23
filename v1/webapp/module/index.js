const get = async function (url, data) {
  return new Promise(resolve => {
    $.ajax({
      url: 'http://localhost/api/blog/list',
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
    <p class="item">
      <h2 class="title">${info.title}</h2>
      <div class="content">${info.content}</div>
      <div>
        <span class="author">作者: ${info.nickname}</span>
      </div>
    </p>
  `
  return el
}

function renderList (list) {
  return list.map(item => {
    return renderListItem(item)
  })
}

async function app () {
  const list = await get()
  console.log('list', list)
  const root = $('#app')
  const elList = renderList(list)
  root.append(elList)
}

app()
