import { FirebaseBaseRepository } from '../index.js'
import { getDatabase } from '../../config/db/firebase.js'

export class FirebaseProductRepository extends FirebaseBaseRepository {
  constructor () {
    super(getDatabase(), 'products')
  }
}
