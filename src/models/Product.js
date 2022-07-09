module.exports = class Product {
  constructor (name, price, description, code, stock, thumbnail) {
    this.id = 0
    this.timestamp = new Date()
    this.name = name
    this.description = description
    this.code = code
    this.price = price
    this.stock = stock
    this.thumbnail = thumbnail
  }

  get prop () { return this.id }
  set prop (value) {
    this.id = value
  }
}
