const controller = require('../../controllers/currency')

const getCurrencyDataByDateRange = async (req, res) => {
    try {
        const payload = await controller.getCurrencyDataByDateRange(req.query)

        res.success({ payload })
    } catch (error) {
        res.error(error)
    }
}

const getCurrencyDataByDateRangeAndSymbol = async (req, res) => {
    try {
        const params = { ...req.query, ...req.params }
        const payload = await controller.getCurrencyDataByDateRangeAndSymbol(params)

        res.success({ payload })
    } catch (error) {
        res.error(error)
    }
}

const removeCurrencyDataByDate = async (req, res)=> {
    try {
        const payload = await controller.removeCurrencyDataByDate(req.query)

        res.success({ payload })
    } catch (error) {
        res.error(error)
    }
}

const createCurrencyData = async (req, res)=> {
    try {
        const payload = await controller.createCurrencyData(req.body)

        res.success({ payload })
    } catch (error) {
        res.error(error)
    }
}

const updateCurrencyData = async (req, res)=> {
    try {
        const payload = await controller.updateCurrencyData(req.body)

        if (payload) {
            res.success({ payload })
        }
        res.error({ code: 404, message: "data doesn't exist" })
    } catch (error) {
        res.error(error)
    }
}


module.exports = {
    getCurrencyDataByDateRange,
    getCurrencyDataByDateRangeAndSymbol,
    removeCurrencyDataByDate,
    createCurrencyData,
    updateCurrencyData
}