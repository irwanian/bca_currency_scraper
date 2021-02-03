const chai = require('chai')
const { reformatMoneyStringToFloat } = require('../lib/moneyFormat')
const { convertDateFormat } = require('../lib/timeFormat')

chai.should()

describe('Test Formatting Functions', () => {
    // TEST CONVERTING MONEY FORMAT
    it('Should convert money string format to float', () => {
        const amount = '14.500,25'
        const convertedAmount = reformatMoneyStringToFloat(amount)
        convertedAmount.should.eq(14500.25)
    })

    // TEST CONVERTING DATE FORMAT

    it('Should convert date format', () => {
        const oldFormat = 'DD MMM YYYY'
        const newFormat = 'YYYY-MM-DD'
        const date = '02 Feb 2021'
        const convertedDate = convertDateFormat({ date, oldFormat, newFormat })

        convertedDate.should.eq('2021-02-02')
    })
})