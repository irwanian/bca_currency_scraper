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
    }),

    createCurrencyData: Joi.object({
        date: Joi.date().iso().error(new Error('date must be YYYY-MM-DD format')),
        symbol: Joi.string().length(3).uppercase().prefs({ convert: false }).error(new Error('symbol should consist of 3 uppercase letter')),
        e_rate: Joi.object({
            jual: Joi.number().min(0).error(new Error('e_rate sell price must be type of integer and >= 0')),
            beli: Joi.number().min(0).error(new Error('e_rate buy price must be type of integer and >= 0')),
        }),
        tt_counter: Joi.object({
            jual: Joi.number().min(0).error(new Error('tt_counter sell price must be type of integer and >= 0')),
            beli: Joi.number().min(0).error(new Error('tt_counter buy price must be type of integer and >= 0')),
        }),
        bank_notes: Joi.object({
            jual: Joi.number().min(0).error(new Error('bank_notes sell price must be type of integer and >= 0')),
            beli: Joi.number().min(0).error(new Error('bank_notes buy price must be type of integer and >= 0')),
        }),
    }),

    updateCurrencyData: Joi.object({
        date: Joi.date().iso().error(new Error('date must be YYYY-MM-DD format')),
        symbol: Joi.string().length(3).uppercase().prefs({ convert: false }).error(new Error('symbol should consist of 3 uppercase letter')),
        e_rate: Joi.object({
            jual: Joi.number().min(0).error(new Error('e_rate sell price must be type of integer and >= 0')),
            beli: Joi.number().min(0).error(new Error('e_rate buy price must be type of integer and >= 0')),
        }),
        tt_counter: Joi.object({
            jual: Joi.number().min(0).error(new Error('tt_counter sell price must be type of integer and >= 0')),
            beli: Joi.number().min(0).error(new Error('tt_counter buy price must be type of integer and >= 0')),
        }),
        bank_notes: Joi.object({
            jual: Joi.number().min(0).error(new Error('bank_notes sell price must be type of integer and >= 0')),
            beli: Joi.number().min(0).error(new Error('bank_notes buy price must be type of integer and >= 0')),
        }),
    })
}

module.exports = schemas