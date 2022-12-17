import swaggerJsDoc from 'swagger-jsdoc'

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      version: 'version 1.0.0',
      title: 'Ecommerce API',
      description: 'Ecommerce API - Coderhouse Project'
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'token',
        scheme: 'bearer',
        in: 'header'
      }
    }
  },
  apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export default swaggerDocs
