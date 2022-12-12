import express from 'express'
import { notFound } from './middlewares/notFound.js'
import { productsRouter, cartsRouter, sessionRouter } from './routes/index.js'
import { config } from './config/index.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport from 'passport'
import initializePassport from './config/passport.config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session config
app.use(session({
  secret: config.MONGO_STORE_SECRET,
  store: MongoStore.create({
    mongoUrl: config.MONGO_DB_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 600
  }),
  resave: false,
  saveUninitialized: false
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Router Middlewares
app.use(config.server.routes.products, productsRouter)
app.use(config.server.routes.carts, cartsRouter)
app.use(config.server.routes.session, sessionRouter)

// custom middlewares
app.use(notFound)

export { app }
