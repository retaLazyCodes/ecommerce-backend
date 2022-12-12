const productSimplified = (products) => {
  if (products?.length) {
    return products.map((product) => {
      return getProductDTO(product)
    })
  }
  return getProductDTO(products)
}

const getProductDTO = (product) => {
  return {
    id: product?.id ? product.id : product._id,
    name: product.name,
    price: product.price,
    thumbnail: product.thumbnail
  }
}

export default { productSimplified }
