export function authorizeUserRole (role = false) {
  return [
    (req, res, next) => {
      if (role !== true) {
        // user's role is not authorized
        return res.status(401).json(
          {
            error: -1,
            descripcion: 'ruta: ' + req.originalUrl + ' metodo: ' + req.method + ' no autorizada'
          })
      }
      // authentication and authorization successful!!
      next()
    }
  ]
}
