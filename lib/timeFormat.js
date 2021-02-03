const moment = require('moment')

const convertDateFormat = ({ date, oldFormat, newFormat })  => {
    return moment(date, oldFormat).format(newFormat)
}

module.exports = {
    convertDateFormat
}