require('dotenv').config()

const express = require('express')
const cors = require('cors')
const logger = require('./src/utils/logger')

const env = process.env.NODE_ENV || 'prod'
const app = express()

if (env === 'dev') {
  const swaggerUi = require('swagger-ui-express')
  const swaggerFile = require('./src/swagger_output.json')

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

const corsPrefs = cors({
  origin: ['https://fresh-nest.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})

const customLogger = (req, _, next) => {
  logger.info(`${req.method} ${req.url}`)
  next()
}

app.use(corsPrefs)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(customLogger)

require('./src/startup/routes')(app)

if (env !== 'test') require('./src/startup/db')()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on Port ${port}...`))
