const express = require('express')

const app = express()

// Router Middlewares
app.use('/api/productos', require('./routes/products.routes'))
app.use('/api/carrito', require('./routes/cart.routes'))

module.exports = app
