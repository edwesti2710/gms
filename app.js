const express = require('express')
require('dotenv').config()
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', require('./src/routes'))

const PORT = process.env.PORT || 3000

async function start() {
    try {
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
        app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start().then()

module.exports = app