import dotenv from 'dotenv'
dotenv.config()

const {
  DB_SERVICE
} = process.env

async function getDatabaseService () {
  switch (DB_SERVICE) {
    case 'MONGO':
      import('./db/mongodb.js')
      break
    case 'FIREBASE':
      import('./db/firebase.js')
        .then(module => module.getDatabase())
      break
    default:
      throw new Error(`Unknown database service: ${DB_SERVICE}`)
  }
}

(async function () {
  return await getDatabaseService()
})()
