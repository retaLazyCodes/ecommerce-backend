import mongoose from 'mongoose'
import { config } from '../index.js'

const connectionString = config.MONGO_DB_URI

// conexión a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Database connected')
  }).catch(err => {
    console.error('Error trying connect to Database\n', err)
  })

/*
process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
*/
