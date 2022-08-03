const mongoose = require('mongoose')
const { config } = require('./index')

const connectionString = config.MONGO_DB_URI

// conexión a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error('Error trying connect to Database\n', err)
  })

/*
process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
*/
