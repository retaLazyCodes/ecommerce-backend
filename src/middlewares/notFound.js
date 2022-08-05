export const notFound = (request, response, next) => {
  return response.status(401).json(
    {
      error: -2,
      descripcion: 'ruta: ' + request.originalUrl + ' metodo: ' + request.method + ' no implementada'
    })
}
