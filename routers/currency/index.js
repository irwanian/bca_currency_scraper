const router = require('express').Router()
const { validate } = require('../../lib/validators')
const schema = require('../../validators/currency')
const gate = require('./gate')

router.get('/', validate(schema.getCurrencyDataByDateRange), gate.getCurrencyDataByDateRange)
router.get('/:symbol', validate(schema.getCurrencyDataByDateRangeAndSymbol), gate.getCurrencyDataByDateRangeAndSymbol)
router.delete('/', validate(schema.removeCurrencyDataByDate), gate.removeCurrencyDataByDate)
router.post('/', validate(schema.createCurrencyData), gate.createCurrencyData)
router.put('/', validate(schema.updateCurrencyData), gate.updateCurrencyData)

module.exports = router