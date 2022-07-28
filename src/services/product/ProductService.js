const fs = require('fs')
const path = require('path')
const Product = require('../../models/Product')

module.exports = class ProductService {
  constructor (filename = 'file.json') {
    this.filename = filename
    this.products = this.#initProducts()
    this.lastId = 0
  }

  async create (product) {
    if (product instanceof Product === false) {
      console.log('el parametro no es de tipo Product')
      return -1
    }
    this.lastId = this.#getLastId()
    product.id = this.lastId + 1
    this.#add(product)
    await this.#writeInDisk()
    return product.id
  }

  getById (id) {
    const product = this.products.find(p => p.id === parseInt(id))
    return product !== undefined ? product : null
  }

  getAll () {
    return this.products
  }

  async updateById (id, product) {
    const productIndex = this.products.findIndex(p => p.id === parseInt(id))
    product.id = parseInt(id)
    this.products.splice(productIndex, 1, product)
    await this.#deleteFromDisk()
    await this.#writeInDisk()
  }

  async deleteById (id) {
    const updatedProducts = this.products.filter(p => p.id !== parseInt(id))
    this.products = updatedProducts
    await this.#deleteFromDisk()
    await this.#writeInDisk()
  }

  async deleteAll () {
    await this.#deleteFromDisk()
    this.products = []
  }

  // private methods
  #add (product) {
    console.log(this.products)
    if (Array.isArray(this.products)) {
      this.products.push(product)
    } else {
      this.products = JSON.parse(this.products)
      this.products.push(product)
    }
  }

  async #writeInDisk () {
    const jsonProducts = JSON.stringify(this.products, null, 2)

    fs.promises.writeFile(this.filename, jsonProducts)
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
        const products = this.#readFromDisk()
        return products[products.length - 1].id
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

  #initProducts () {
    const products = this.#readFromDisk()
    console.log(products)
    if (products === '[]') {
      return JSON.parse(products)
    }
    return products
  }
}
