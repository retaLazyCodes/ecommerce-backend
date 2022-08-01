const fs = require('fs')
const path = require('path')
const Cart = require('../../models/Cart')

module.exports = class CartService {
  constructor (filename = 'carts.json') {
    this.filename = filename
    this.carts = this.#initCarts()
    this.lastId = 0
  }

  async create (cart) {
    if (cart instanceof Cart === false) {
      console.log('el parametro no es de tipo Cart')
      return -1
    }
    this.lastId = this.#getLastId()
    cart.id = this.lastId + 1
    this.#add(cart)
    await this.#writeInDisk()
    return cart.id
  }

  async addProductToCart (cartId, product) {
    const cartIndex = this.carts.findIndex(c => c._id === parseInt(cartId))
    this.carts[cartIndex]._products.push(product)
    await this.#deleteFromDisk()
    await this.#writeInDisk()
  }

  getById (id) {
    const cart = this.carts.find(c => c._id === parseInt(id))
    return cart !== undefined ? cart : null
  }

  getAll () {
    return this.carts
  }

  async deleteProductOfCart (id, productId) {
    const cartIndex = this.carts.findIndex(c => c._id === parseInt(id))
    const productIndex = this.carts[cartIndex]._products.findIndex(p => p.id === productId)
    this.carts[cartIndex]._products.splice(productIndex, 1)
    await this.#deleteFromDisk()
    await this.#writeInDisk()
  }

  async deleteById (id) {
    const filteredCarts = this.carts.filter(c => c._id !== parseInt(id))
    this.carts = filteredCarts
    await this.#deleteFromDisk()
    await this.#writeInDisk()
  }

  async deleteAll () {
    await this.#deleteFromDisk()
    this.carts = []
  }

  // private methods
  #add (cart) {
    console.log(this.carts)
    if (Array.isArray(this.carts)) {
      this.carts.push(cart)
    } else {
      this.carts = JSON.parse(this.carts)
      this.carts.push(cart)
    }
  }

  async #writeInDisk () {
    const json = JSON.stringify(this.carts, null, 2)

    fs.promises.writeFile(this.filename, json)
      .then(() => {
        console.log('JSON saved')
      })
      .catch(err => {
        console.log(err)
      })
  }

  async #deleteFromDisk () {
    fs.promises.unlink(this.filename)
      .then(() => {
        console.log('file deleted')
      })
      .catch(err => {
        console.log(err)
      })
  }

  #getLastId () {
    try {
      if (this.#existFile()) {
        const carts = this.#readFromDisk()
        return carts[carts.length - 1]._id
      }
      return 0
    } catch (err) {
      console.error(err)
    }
  }

  #readFromDisk () {
    try {
      if (this.#existFile()) {
        const content = fs.readFileSync(path.join(process.cwd(), this.filename), 'utf8').toString()
        return JSON.parse(content, null, 2)
      }
      return JSON.stringify([])
    } catch (err) {
      console.error(err)
    }
  }

  #existFile () {
    return fs.existsSync(this.filename)
  }

  #initCarts () {
    const carts = this.#readFromDisk()
    console.log(carts)
    if (carts === '[]') {
      return JSON.parse(carts)
    }
    return carts
  }
}
