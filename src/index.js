import { app } from './app.js'
import { config } from './config/index.js'

const PORT = config.server.PORT

const server = app.listen(PORT, () => {
  console.log(`Express server listening on: \nhttp://localhost:${PORT}`)
})

export { app, server }
