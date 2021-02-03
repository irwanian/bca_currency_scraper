const CurrencyModel = require('../models').mysql.currencies
const { Op } = require('sequelize')

const getCurrencyDataByDate = async ({ date }) => {
    try {
        // SELECT * FROM CURRENCIES WHERE DATE = 'date
        const existingData = await CurrencyModel.findAll({ where: { date }})
        
        return existingData
    } catch (error) {
        throw error       
    }
}

const getCurrencyDataByDateAndSymbol = async ({ date, symbol }) => {
    try {
        // SELECT * FROM CURRENCIES WHERE DATE = 'date AND SYMBOL = 'symbol'
        const schemaOptions = {
            where: {
                [Op.and]: [{ date }, { symbol }]
            },
            plain: true
        }

        const existingData = await CurrencyModel.findOne(schemaOptions)
        
        return existingData
    } catch (error) {
        throw error       
    }
}

const getCurrencyDataByDateRangeAndSymbol = async ({ startdate, enddate, symbol }) => {
    try {
        // SELECT * FROM CURRENCIES WHERE DATE BETWEEN 'startdate' AND 'enddate' AND SYMBOL = 'symbol'
        const schemaOptions = {
            where: {
                [Op.and]: [
                    {
                        date: {
                            [Op.between] : [startdate, enddate]
                        }
                    },
                    { symbol }
                ]
            }
        }

        const existingData = await CurrencyModel.findAll(schemaOptions)
        
        return existingData
    } catch (error) {
        throw error       
    }
}

const getCurrencyDataByDateRange = async ({ startdate, enddate })  => {
    try {
        // SELECT * FROM CURRENCIES WHERE DATE BETWEEN 'startdate' AND 'enddate' 
        const schemaOptions = {
            where: {
                date: {
                    [Op.between] : [startdate, enddate]}
            }
        }
        const currencyData = await CurrencyModel.findAll(schemaOptions)

        return currencyData
    } catch (error) {
        throw error
    }
}

const removeCurrencyDataByDate = async ({ date }) => {
    try {
        const dataToBeDeleted = await getCurrencyDataByDate({ date })
        await CurrencyModel.destroy({ where: { date }})
        
        return dataToBeDeleted
    } catch (error) {
        throw error
    }
}

const createCurrencyData = async (params) => {
    try {
        const existingData = await getCurrencyDataByDateAndSymbol(params)
        
        if (existingData) {
            return existingData
        }
        else {
            const newDataCreated = await CurrencyModel.create(params)
            return newDataCreated
        }
    } catch (error) {
        throw error
    }
}

const updateCurrencyData = async (params) => {
    try {
        const { symbol, e_rate, tt_counter, bank_notes, date } = params
        
        const existingData = await getCurrencyDataByDateAndSymbol(params)
        if (existingData) {
            existingData.symbol = symbol
            existingData.e_rate = e_rate
            existingData.tt_counter = tt_counter
            existingData.bank_notes = bank_notes
            existingData.date = date

            return existingData.save()
        }
        else {
            return null
        }
    } catch (error) {
        throw error
    }
}

module.exports= {
    getCurrencyDataByDateRange,
    getCurrencyDataByDateRangeAndSymbol,
    removeCurrencyDataByDate,
    createCurrencyData,
    updateCurrencyData
}