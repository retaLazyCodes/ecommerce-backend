import dotenv from 'dotenv'
dotenv.config()

const {
  DEV_PORT,
  MONGO_DB_URI,
  DB_SERVICE,
  MONGO_STORE_SECRET,
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TEL_NUMBER
} = process.env

const USER_ADMIN = true

const config = {
  USER_ADMIN,
  MONGO_DB_URI,
  DB_SERVICE,
  MONGO_STORE_SECRET,
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TEL_NUMBER,
  server: {
    PORT: process.env.PORT ? process.env.PORT : DEV_PORT,
    routes: {
      base: '/api',
      products: '/api/productos',
      carts: '/api/carrito',
      session: '/api/sessions',
      views: '/'
    }
  }
}

export { config }
