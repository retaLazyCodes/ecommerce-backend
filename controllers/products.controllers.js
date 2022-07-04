exports.getProducts = (request, response, next) => {
  try {
    response.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.createProduct = async (request, response, next) => {
  try {
    response.status(201).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (request, response, next) => {
  try {
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = (request, response, next) => {
  try {
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}
