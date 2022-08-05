import admin from 'firebase-admin'

let hasInit = false
let _db

function initializeDatabase () {
  if (!hasInit) {
    admin.initializeApp({
      credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        // replace `\` and `n` character pairs w/ single `\n` character
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    })
    console.log('Firestore Database connected')
    hasInit = true
  }
}

export function getDatabase () {
  initializeDatabase()
  return _db ?? (_db = admin.firestore())
}
