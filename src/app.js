import express from 'express'
import { notFound } from './middlewares/notFound.js'
import { productsRouter, cartsRouter, authRouter, orderRouter } from './routes/index.js'
import { config } from './config/index.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport from 'passport'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './config/swagger.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session config
app.use(session({
  store: MongoStore.create({
    mongoUrl: config.MONGO_DB_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 600
  }),
  secret: config.MONGO_STORE_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: false,
  cookie: {
    maxAge: 600000
  }
}))

// setup swagger
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
)

// Router Middlewares
app.use(
  config.server.routes.products,
  productsRouter
)
app.use(
  config.server.routes.auth,
  authRouter
)
app.use(
  config.server.routes.carts,
  passport.authenticate('jwt', { session: false }),
  cartsRouter
)
app.use(
  config.server.routes.order,
  passport.authenticate('jwt', { session: false }),
  orderRouter
)

// custom middlewares
app.use(notFound)

export { app }
