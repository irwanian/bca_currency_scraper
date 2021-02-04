require('dotenv').config()

require('./models')
require('./routers')

// FOR TESTING PURPOSE
module.exports = require('./routers')