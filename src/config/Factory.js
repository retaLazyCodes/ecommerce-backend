import { config } from './index.js'
import MongoClient from './db/MongoClient.js'
const { PERSISTENCE_SERVICE } = config

export default class PersistenceFactory {
  static getPersistence = async () => {
    const { default: services } = await import('../services/index.js')
    const { CartService, ProductService } = services

    switch (PERSISTENCE_SERVICE) {
      case 'MONGO': {
        MongoClient.getInstance()
        const { default: ProductMongoDao } = await import('../dao/product/productsMongo.dao.js')
        const { default: CartMongoDao } = await import('../dao/cart/cartsMongo.dao.js')
        const { MongoProductRepository } = await import('../repositories/mongodb/product.repository.js')
        const { MongoCartRepository } = await import('../repositories/mongodb/cart.repository.js')
        return {
          productsDao: ProductMongoDao.getInstance(),
          cartsDao: CartMongoDao.getInstance(),
          productsRepository: MongoProductRepository.getInstance(),
          cartsRepository: MongoCartRepository.getInstance(),
          productService: ProductService.getInstance(MongoProductRepository.getInstance()),
          cartService: CartService.getInstance(MongoCartRepository.getInstance())
        }
      }
      default:
        throw new Error(`Unknown persistence service: ${PERSISTENCE_SERVICE}`)
    }
  }
}
