const Joi = require('joi')

const schemas = {
    getCurrencyDataByDateRange: Joi.object({
        startdate: Joi.date().iso().error(new Error('enddate must be YYYY-MM-DD format and <= enddate')),
        enddate: Joi.date().iso().min(Joi.ref('startdate')).error(new Error('enddate must be YYYY-MM-DD format and >= startdate')),
    }),

    getCurrencyDataByDateRangeAndSymbol: Joi.object({
        startdate: Joi.date().iso().error(new Error('enddate must be YYYY-MM-DD format and <= enddate')),
        enddate: Joi.date().iso().min(Joi.ref('startdate')).error(new Error('enddate must be YYYY-MM-DD format and >= startdate')),
        symbol: Joi.string().length(3).uppercase().prefs({ convert: false }).error(new Error('symbol should consist of 3 uppercase letter'))
    }),
    
    removeCurrencyDataByDate: Joi.object({
        date: Joi.date().iso().error(new Error('date must be YYYY-MM-DD format')),
    })
}

module.exports = schemas