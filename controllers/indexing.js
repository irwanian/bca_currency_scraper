const cheerio = require('cheerio')
const moment = require('moment')
const { Op } = require('sequelize')
const { sendHttpRequest } = require('../lib/request')
const { reformatMoneyStringToFloat } = require('../lib/moneyFormat')
const { convertDateFormat } = require('../lib/timeFormat')
const CurrencyModel = require('../models/').mysql.currencies
const BCA_CURRENCY_URL = 'https://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator'



const getCurrencyData = async () => {
    try {
        const symbols = []
        
        const currencyData = await scrapeCurrencyFromBca(BCA_CURRENCY_URL)
        currencyData.forEach((data) => symbols.push(data.symbol))
        const existingCurrencyData = await checkExistingCurrencyData({ currencyData, symbols })

        if (existingCurrencyData.length > 0) {
            // CHECK MISSING SYMBOL(S) ON CURRENT DATE
            // IF THERE ARE MISSING SYMBOLS, INSERT MISSING SYMBOL TO DB
            // ELSE JUST RETURN EXISTING DATA ON THAT DATE
            const missingSymbols = checkMissingSymbolFromScrapedData({ symbols, existingCurrencyData })
            const newDataToBeAdded = currencyData.filter(val => missingSymbols.includes(val.symbol))

            const result = missingSymbols.length > 0 ? await bulkInsertScrapedData(newDataToBeAdded) : existingCurrencyData

            return result
        }
        else {
            const currencyDataInserted = await bulkInsertScrapedData(currencyData)
            
            return currencyDataInserted
        }
    } catch (error) {
        throw error       
    }
}

const bulkInsertScrapedData = async (data) => {
    try {
        return await CurrencyModel.bulkCreate(data)
    } catch (error) {
        throw error
    }
}

const checkExistingCurrencyData = async ({ currencyData, symbols }) => {
    const schemaOptions = {
        where: {[Op.and]: [
            { date: currencyData[0].date },
            { symbol: { [Op.in]: symbols }}
        ]},
        raw: true
    }
    
    const results = await CurrencyModel.findAll(schemaOptions)

    return results
}

const checkMissingSymbolFromScrapedData = ({ existingCurrencyData, symbols }) => {
    try {
        const existingSymbols = [...existingCurrencyData.map(data => data.symbol)]
        const missingSymbols = symbols.filter(symbol => !existingSymbols.includes(symbol))
        
        return missingSymbols
    } catch (error) {
        throw error       
    }
}

const scrapeCurrencyFromBca = async url => {
    try {
        const currencyData = await sendHttpRequest({ url, method: 'get' })
        const $ = cheerio.load(currencyData)
        const tableData = getTableData($)

        return tableData
    } catch (error) {
        throw error
    }
}

const getTableData = ($) => {
    const contents = []
    // GET CURRENCY DATA FROM BCA CURRENCY TABLE ROWS
    $('body > section.container > div > section:nth-child(1) > div:nth-child(2) > div.table-responsive.col-md-8.kurs-e-rate > table > tbody > tr')
    .each((i, tr) => {
        const td = $(tr).find('td')
        const symbol = $(td[0]).text()
        const e_rate = {
            beli: reformatMoneyStringToFloat($(td[1]).text()),
            jual: reformatMoneyStringToFloat($(td[2]).text())
        }
        const tt_counter = {
            beli: reformatMoneyStringToFloat($(td[3]).text()),
            jual: reformatMoneyStringToFloat($(td[4]).text())
        }
        const bank_notes = {
            beli: reformatMoneyStringToFloat($(td[5]).text()),
            jual: reformatMoneyStringToFloat($(td[6]).text())
        }
        contents.push({ symbol, e_rate, tt_counter, bank_notes })
    })

    // GET DATE FROM BCA CURRENCY TABLE HEADERS
    const th = $('body > section.container > div > section:nth-child(1) > div:nth-child(2) > div.table-responsive.col-md-8.kurs-e-rate > table > thead > tr:nth-child(1) > th:nth-child(2)')
    const tableDate = th.text().split('e-Rate')[1].split(' /')[0]
    const date = convertDateFormat({ date: tableDate, oldFormat: 'DD MMM YYYY', newFormat: 'YYYY-MM-DD' })
    contents.map((content) => {
            content.date = date
            content.created_at = content.updated_at = moment().unix()
    })

    return contents
}

module.exports = {
    getCurrencyData,
    scrapeCurrencyFromBca
}
