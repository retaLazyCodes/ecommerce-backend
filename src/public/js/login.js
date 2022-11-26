const form = document.getElementById('loginForm')
const btn = document.getElementById('gotoRegister')

form.addEventListener('submit', evt => {
  evt.preventDefault()
  const data = new window.FormData(form)
  const obj = {}
  data.forEach((value, key) => { obj[key] = value })
  fetch('/api/sessions/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => result.json()).then(json => {
    if (json.status === 'success') {
      console.log(json)
      console.log('todo ok')
      window.location.href = '/'
    } else {
      window.location.href = './loginfail'
    }
  })
})

btn.addEventListener('click', evt => {
  evt.preventDefault()
  window.location.href = './register'
})
