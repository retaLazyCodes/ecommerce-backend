const express = require('express')
const notFound = require('./middlewares/notFound.js')

const app = express()

app.use(express.json())

// Router Middlewares
app.use('/api/productos', require('./routes/products.routes'))
app.use('/api/carrito', require('./routes/cart.routes'))

// custom middlewares
app.use(notFound)

module.exports = app
