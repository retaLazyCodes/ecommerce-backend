require('./config/dbConnection')

const express = require('express')
const notFound = require('./middlewares/notFound.js')
const { productsRouter, cartsRouter } = require('./routes/')
const { config } = require('./config/')

const app = express()

app.use(express.static('public'))
app.use(express.json())

// Router Middlewares
app.use(config.server.routes.products, productsRouter)
app.use(config.server.routes.carts, cartsRouter)

// custom middlewares
app.use(notFound)

module.exports = app
