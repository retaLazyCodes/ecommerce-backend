// Cerrar sesión
const btnLogout = document.getElementById('logoutbtn')
btnLogout.addEventListener('click', evt => {
  window.location.href = './logout'
})

let buyBtn = document.getElementById('buybtn')

// Agregar productos al carrito
const cartId = document.querySelector('.section-carrito').id
const btnsAddToCart = document.querySelectorAll('.btnAddToCart')

function addProductToCart (productId) {
  fetch(`/api/carrito/${cartId}/productos/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => result.json()).then(json => {
    console.log(json)
    if (json.success) {
      // buyBtn = document.getElementById('buybtn')
      window.location.reload()
    }
  })
}

btnsAddToCart.forEach((btn) => {
  btn.addEventListener('click', async (event) => {
    event.preventDefault()
    console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)
    addProductToCart(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)
  })
})

// Finalizar compra

buyBtn.addEventListener('click', evt => {
  window.Swal.fire({
    title: '(⌐■_■)',
    text: 'Haz finalizado tu compra con éxito! En breve le enviaremos un email y un SMS para continuar con el envío',
    icon: 'success',
    timer: 3000,
    buttonsStyling: false
  })

  window.location.href = './checkout'
})
