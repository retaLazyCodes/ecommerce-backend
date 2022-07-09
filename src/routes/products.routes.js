const router = require('express').Router()
const productsController = require('../controllers/products.controllers')
const authorizeUserRole = require('../middlewares/authorizeUserRole')
const { USER_ROLE } = require('../config/user_config')

router.get('/:id?', productsController.getProducts)
router.post('/', authorizeUserRole(USER_ROLE), productsController.createProduct)
router.put('/:id', authorizeUserRole(USER_ROLE), productsController.updateProduct)
router.delete('/:id', authorizeUserRole(USER_ROLE), productsController.deleteProduct)

module.exports = router
