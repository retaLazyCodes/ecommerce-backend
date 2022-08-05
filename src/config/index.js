import dotenv from 'dotenv'
dotenv.config()

const {
  DEV_PORT,
  MONGO_DB_URI,
  DB_SERVICE
} = process.env

const USER_ADMIN = true

const config = {
  USER_ADMIN,
  MONGO_DB_URI,
  DB_SERVICE,
  server: {
    PORT: process.env.PORT ? process.env.PORT : DEV_PORT,
    routes: {
      base: '/api',
      products: '/api/productos',
      carts: '/api/carrito'
    }
  }
}

export { config }
