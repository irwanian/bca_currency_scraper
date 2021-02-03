const router = require('express').Router()
const gate = require('./gate')

router.get('/', gate.getCurrencyData)

module.exports = router