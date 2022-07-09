exports.createCart = async (request, response, next) => {
  try {
    response.status(201).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.deleteCart = (request, response, next) => {
  try {
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.getProductsByCartId = (request, response, next) => {
  try {
    response.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.addProductToCart = async (request, response, next) => {
  try {
    response.status(201).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.deleteProductOfCart = (request, response, next) => {
  try {
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}
