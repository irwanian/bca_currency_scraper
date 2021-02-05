const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.use(chaiHttp)
chai.should()
const request = chai.request(server).keepOpen()


describe('GET /api/kurs', () => {
    it('should get currency data by date range', (done) => {
        const startdate = '2021-02-02'
        const enddate = '2021-02-03'
        request.get(`/api/kurs?startdate=${startdate}&enddate=${enddate}`)
        .end((err, result) => {
            result.should.have.status(200)
            result.should.have.property('type').eq('application/json')
            result.should.have.property('error').eq(false)
            result.should.have.property('body').haveOwnProperty('message').eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('array').length.least(0)
            done()
        })
    })
})

describe('GET /api/kurs/:symbol', () => {
    it('should get currency data by date range and symbol', (done) => {
        const startdate = '2021-02-02'
        const enddate = '2021-02-03'
        request.get(`/api/kurs/USD?startdate=${startdate}&enddate=${enddate}`)
        .end((err, result) => {
            result.should.have.status(200)
            result.should.have.property('type').eq('application/json')
            result.should.have.property('error').eq(false)
            result.should.have.property('body').haveOwnProperty('message').eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('array').length.least(0)
            done()
        })
    })
})

describe('POST /api/kurs', () => {
    it('should post new currency record', (done) => {
        const objCurrency = {
            symbol: 'BTX',
            e_rate: {
                jual: 23500,
                beli: 23235.8
            },
            tt_counter: {
                jual: 23400,
                beli: 23135.6
            },
            bank_notes: {
                jual: 23470,
                beli: 23215.7
            },
            date: '2021-02-01'
        }

        request.post('/api/kurs')
        .send(objCurrency)
        .end((err, result)=> {
            result.should.have.status(200)
            result.should.have.property('type').eq('application/json')
            result.should.have.property('error').eq(false)
            result.should.have.property('body').haveOwnProperty('message').eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('object')
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('symbol').a('string').lengthOf(3)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('e_rate').a('object').haveOwnProperty('jual').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('e_rate').a('object').haveOwnProperty('beli').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('tt_counter').a('object').haveOwnProperty('jual').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('tt_counter').a('object').haveOwnProperty('beli').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('bank_notes').a('object').haveOwnProperty('jual').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('bank_notes').a('object').haveOwnProperty('beli').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('date').a('string').lengthOf(10)
      
            done()
        })
    })

    it('should NOT post new currency record', (done) => {
        const objCurrency = {
            symbol: 'BTX',
            e_rate: {
                jual: 23500,
                beli: 23235.8
            },
            tt_counter: {
                beli: 23135.6
            },
            bank_notes: {
                jual: -23470,
                beli: 23215.7
            },
            date: '2021-02-01'
        }

        request.post('/api/kurs')
        .send(objCurrency)
        .end((err, result)=> {
            result.should.have.status(400)
            result.should.have.property('type').eq('application/json')
            result.should.have.property('body').haveOwnProperty('message').not.eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('object')
            
            done()
        })
    })
})

describe('PUT /api/kurs', () => {
    it('should update currency record', (done) => {
        const objCurrency = {
            symbol: 'BTX',
            e_rate: {
                jual: 23500,
                beli: 23235.8
            },
            tt_counter: {
                jual: 23400,
                beli: 23135.6
            },
            bank_notes: {
                jual: 23470,
                beli: 23215.7
            },
            date: '2021-02-01'
        }

        request.put('/api/kurs')
        .send(objCurrency)
        .end((err, result)=> {
            result.should.have.status(200)
            result.should.have.property('type').eq('application/json')
            result.should.have.property('error').eq(false)
            result.should.have.property('body').haveOwnProperty('message').eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('object')
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('symbol').a('string').lengthOf(3)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('e_rate').a('object').haveOwnProperty('jual').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('e_rate').a('object').haveOwnProperty('beli').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('tt_counter').a('object').haveOwnProperty('jual').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('tt_counter').a('object').haveOwnProperty('beli').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('bank_notes').a('object').haveOwnProperty('jual').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('bank_notes').a('object').haveOwnProperty('beli').a('number').at.least(0)
            result.should.have.property('body').haveOwnProperty('payload').a('object')
                  .haveOwnProperty('date').a('string').lengthOf(10)
            
            done()
        })
    })

    it('should NOT update currency record', (done) => {
        const objCurrency = {
            symbol: 'BTX',
            e_rate: {
                jual: 7500,
                beli: 7235.8
            },
            tt_counter: {
                beli: 7135.6
            },
            bank_notes: {
                jual: -7470,
                beli: 7215.7
            },
            date: '2021-02-01'
        }

        request.post('/api/kurs')
        .send(objCurrency)
        .end((err, result)=> {
            result.should.have.status(400)
            result.should.have.property('type').eq('application/json')
            result.should.have.property('body').haveOwnProperty('message').not.eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('object')
            
            done()
        })
    })
})

describe('DELETE /api/kurs', () => {
    it('should delete currency record', (done) => {
        request.delete('/api/kurs?date=2021-02-01')
        .end((err, result)=> {
            result.should.have.status(200)
            result.should.have.property('body').haveOwnProperty('message').eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('array').length.least(0)
            
            done()
        })
    })

    it('should NOT delete currency record', (done) => {
        request.delete('/api/kurs?date=01-02-2021')
        .end((err, result)=> {
            result.should.have.status(400)
            result.should.have.property('body').haveOwnProperty('message').not.eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('object')
            
            done()
        })
    })
})