fetch('/api/sessions/logout')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setTimeout(() => { window.location.href = './login' }, 2000)
  })
