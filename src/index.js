const express = require('express')
const cors = require('cors')
const path = require('path')

//config
const envConfig = require('./configs/envConfig')
const dbConfig = require('./configs/dbConfig')
require('./configs/redisConfig')
const swaggerConfig = require('./docs/swaggerConfig')
const routeConfig = require('./routes')
const authenticated = require('./middlewares/auth')

//error
const BadReq = require('./utils/response/badRequest')
const response = require('./utils/response/response')

const app = express()

swaggerConfig(app)
dbConfig()
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

app.use(authenticated)

routeConfig(app)

app.use((error, req, res, next) => {
    if (error instanceof BadReq) {
        return res.status(error.status).json(response.badRequest(error))
    }
    console.log(error)
    return res.status(error.status || 500).json(response.serverError(error))
})

app.listen(envConfig.PORT, () => {
    console.log('Sever is running......')
})
