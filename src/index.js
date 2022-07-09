const app = require('./app')

const PORT = process.env.PORT ? process.env.PORT : 8080

const server = app.listen(PORT, () => {
  console.log(`Express server listening on: \nhttp://localhost:${PORT}`)
})

module.exports = { app, server }
