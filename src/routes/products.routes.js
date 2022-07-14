const router = require('express').Router()
const productsController = require('../controllers/products.controllers')
const authorizeUserRole = require('../middlewares/authorizeUserRole')
const { config } = require('../config/')

const USER_ROLE = config.USER_ADMIN

router.get('/:id?', productsController.getProducts)
router.post('/', authorizeUserRole(USER_ROLE), productsController.createProduct)
router.put('/:id', authorizeUserRole(USER_ROLE), productsController.updateProduct)
router.delete('/:id', authorizeUserRole(USER_ROLE), productsController.deleteProduct)

module.exports = router
