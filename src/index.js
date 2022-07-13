const app = require('./app')
const { config } = require('./config/')

const PORT = config.server.PORT

const server = app.listen(PORT, () => {
  console.log(`Express server listening on: \nhttp://localhost:${PORT}`)
})

module.exports = { app, server }
