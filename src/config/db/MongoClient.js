import mongoose from 'mongoose'

const {
  NODE_ENV,
  MONGO_DB_URI,
  MONGO_DB_URI_DEV
} = process.env

const connectionString =
    NODE_ENV === 'production'
      ? MONGO_DB_URI
      : MONGO_DB_URI_DEV

export default class MongoClient {
  constructor () {
    this.connection = mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log('MongoDB Database connected')
      }).catch(err => {
        console.error('Error trying connect to Database\n', err)
      })
  }

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new MongoClient()
    } else {
      return this.instance
    }
  }
}
