// const form = document.getElementById('registerForm')
const btn = document.getElementById('gotoLogin')

// form.addEventListener('submit', evt => {
//   evt.preventDefault()
//   const data = new FormData(form)
//   const obj = {}
//   data.forEach((value, key) => { obj[key] = value })
//   console.log(obj)
//   fetch('/api/sessions/register', {
//     method: 'POST',
//     body: data
//     // headers: {
//     //   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
//     // }
//   }).then(result => result.json()).then(json => {
//     console.log(json)
//     if (json.status === 'success') {
//       console.log('todo ok')
//       // window.location.href = './login.html'
//     } else {
//       console.log('todo mal')
//       window.location.href = './registerfail.html'
//     }
//   })
// })

btn.addEventListener('click', evt => {
  evt.preventDefault()
  window.location.href = './login'
})
