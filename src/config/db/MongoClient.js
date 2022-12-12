import mongoose from 'mongoose'
import { config } from '../index.js'

const connectionString = config.MONGO_DB_URI

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
