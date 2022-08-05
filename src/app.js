import './config/dbConnection.js'
import express from 'express'
import { notFound } from './middlewares/notFound.js'
import { productsRouter, cartsRouter } from './routes/index.js'
import { config } from './config/index.js'

const app = express()

app.use(express.static('public'))
app.use(express.json())

// Router Middlewares
app.use(config.server.routes.products, productsRouter)
app.use(config.server.routes.carts, cartsRouter)

// custom middlewares
app.use(notFound)

export { app }
