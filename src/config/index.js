import dotenv from 'dotenv'
dotenv.config()

const {
  DEV_PORT,
  MONGO_DB_URI,
  PERSISTENCE_SERVICE,
  MONGO_STORE_SECRET,
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TEL_NUMBER
} = process.env

const config = {
  MONGO_DB_URI,
  PERSISTENCE_SERVICE,
  MONGO_STORE_SECRET,
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TEL_NUMBER,
  server: {
    PORT: process.env.PORT ? process.env.PORT : DEV_PORT,
    routes: {
      products: '/api/products',
      carts: '/api/cart',
      auth: '/api/auth',
      order: '/api/orders'
    }
  }
}

export { config }
