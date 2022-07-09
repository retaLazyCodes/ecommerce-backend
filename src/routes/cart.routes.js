const router = require('express').Router()
const cartController = require('../controllers/cart.controllers')

router.get('/', (req, res) => {
  res.json('todo joya en el carrito 😎')
})

router.post('/', cartController.createCart)
router.delete('/:id', cartController.deleteCart)
router.get('/:id/productos', cartController.getProductsByCartId)
router.post('/:id/productos', cartController.addProductToCart)
router.delete('/:id/productos/:id_prod', cartController.deleteProductOfCart)

module.exports = router
