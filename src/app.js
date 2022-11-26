import './config/dbConnection.js'
import express from 'express'
import { notFound } from './middlewares/notFound.js'
import __dirname from './utils.js'
import { productsRouter, cartsRouter, sessionRouter, viewsRouter } from './routes/index.js'
import { config } from './config/index.js'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport from 'passport'
import handlebars from 'express-handlebars'
import initializePassport from './config/passport.config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Loads the handlebars module

// Sets handlebars configurations
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defautLayout: 'index.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

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
app.use(config.server.routes.views, viewsRouter)

// custom middlewares
app.use(notFound)

export { app }
