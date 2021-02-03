const CurrencyModel = require('../models').mysql.currencies
const { Op } = require('sequelize')

const getCurrencyDataByDateRangeAndSymbol = async ({ startdate, enddate, symbol }) => {
    try {
        // SELECT * FROM CURRENCIES WHERE DATE BETWEEN 'startdate' AND 'enddate' AND SYMBOL = 'symbol'
        const schemaConditions = {
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

        const existingData = await CurrencyModel.findAll(schemaConditions)
        
        return existingData
    } catch (error) {
        throw error       
    }
}

const getCurrencyDataByDateRange = async ({ startdate, enddate })  => {
    try {
        const schemaConditions = {
            where: {
                date: {
                    [Op.between] : [startdate, enddate]}
            }
        }
        const currencyData = await CurrencyModel.findAll(schemaConditions)

        return currencyData
    } catch (error) {
        throw error
    }
}

const removeCurrencyDataByDate = async ({ date }) => {
    try {
        const dataDeleted = await CurrencyModel.destroy({ where: { date }})

        console.log({ dataDeleted })
        return dataDeleted
    } catch (error) {
        throw error
    }
}

module.exports= {
    getCurrencyDataByDateRange,
    getCurrencyDataByDateRangeAndSymbol,
    removeCurrencyDataByDate
}