const express = require('express')
var cors = require('cors');
require('dotenv').config()
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', require('./src/routes'))
const PORT = process.env.PORT || 3000


var allowlist = ['http://example1.com', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.get('/products/:id', cors(corsOptionsDelegate), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for an allowed domain.' })
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})


async function start() {
    try {
        app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start().then()

module.exports = app