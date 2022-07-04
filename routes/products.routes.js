const router = require('express').Router()
const productsController = require('../controllers/products.controllers')

router.get('/', (req, res) => {
  res.json('todo joya con los products 😎')
})

router.get('/:id?', productsController.getProducts)
router.post('/', productsController.createProduct)
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)

module.exports = router
