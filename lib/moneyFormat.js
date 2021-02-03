const reformatMoneyStringToFloat = (amount) => {
    return parseFloat(amount.replace(/[.]/gi, '').replace(',', '.'))
}

module.exports = {
    reformatMoneyStringToFloat
}