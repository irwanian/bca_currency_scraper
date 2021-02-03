const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize } = require('../models').mysql
const port = process.env.PORT || 7000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use((req, res, next) => {
    res.success = ({ payload, message, code }) => {
        res.status(200).send({
            code: code || 200,
            message: message || 'success',
            payload: payload || {}
        })
    }

    res.error = (error) => {
        res.status(error.code || 400).send({
            code: error.code || 400,
            message: error.message || 'error',
            payload: error.payload || {}
        })
    }

    next()
})

app.get('/', (req, res) => {
    res.success({ payload: 'BANZAI!!! '})
})

app.use('/api/indexing', require('./indexing'))
app.use('/api/kurs', require('./currency'))


sequelize.sync()
.then(() => {
        app.listen(port, () => {
              console.log(`App listening on port: ${port}`)
        })
})
.catch((err) => {
    throw err
})

module.exports = app