const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const envConfig = require('../configs/envConfig')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Example API',
            version: '1.0.0',
            description: 'API documentation for your app',
        },
        servers: [
            {
                url: `http://localhost:${envConfig.PORT}${envConfig.BASE_URL}`,
            },
            {
                url: `https://qldapm-be.onrender.com${envConfig.BASE_URL}`,
            },
        ],
    },
    apis: ['src/docs/*.js', 'src/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerConfig = (app) => {
    app.use(
        envConfig.SWAGGER_URL,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec),
    )
}

module.exports = swaggerConfig
