module.exports = class Cart {
  constructor () {
    this._id = 0
    this.timestamp = new Date()
    this._products = []
  }

  get id () { return this._id }
  set id (value) {
    this._id = value
  }

  get products () { return this._products }
  set products (value) {
    this._products = value
  }
}
