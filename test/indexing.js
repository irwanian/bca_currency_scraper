const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const { scrapeCurrencyFromBca } = require('../controllers/indexing')

chai.use(chaiHttp)
chai.should()
const request = chai.request(server).keepOpen()

describe('GET /api/indexing', () => {
    it('should scrape currency data from bca and insert into database', (done) => {
        request.get(`/api/indexing`)
        .end((err, result) => {
            result.should.have.status(200)
            result.should.have.property('type').eq('application/json')
            result.should.have.property('error').eq(false)
            result.should.have.property('body').haveOwnProperty('message').eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('array').length.least(1)
            done()
        })
    })
})

describe('test scraping function', () => {
    it('should return scraped currency data from bca', () => {
        const BCA_CURRENCY_URL = 'https://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator'
        return scrapeCurrencyFromBca(BCA_CURRENCY_URL)
        .then((result) => {
            result.map(data => ({ symbol: data.symbol }))[0].should.include({ symbol: 'USD' })
             result.should.be.a('array').length.least(16)   
        })
        .then(done => done)
        .catch(err => err)
    })
})