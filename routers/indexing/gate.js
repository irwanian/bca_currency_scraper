const controllers = require('../../controllers/indexing')

const getCurrencyData = async (req, res) => {
    try {
        const payload = await controllers.getCurrencyData()

        res.success({ payload })
    } catch (error) {
        console.log({ error })
        res.error(error)
    }
}

module.exports = {
    getCurrencyData
}