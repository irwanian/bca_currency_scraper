const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.use(chaiHttp)
chai.should()
const request = chai.request(server).keepOpen()

describe('GET /api/kurs', () => {
    it('should not get currency data by date range', (done) => {
        const startdate = '22-11-2020'
        const enddate = '2021-02-03'
        request.get(`/api/kurs?startdate=${startdate}&enddate=${enddate}`)
            .end((err, result) => {
                result.should.have.status(400)
                result.should.have.property('body').haveOwnProperty('message').not.eq('success')
                result.should.have.property('body').haveOwnProperty('payload').a('object')
                done()
            })
    })
    
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
    it('should not get currency data by date range and symbol', (done) => {
        const startdate = '22-11-2020'
        const enddate = '2021-02-03'
        request.get(`/api/kurs/usd?startdate=${startdate}&enddate=${enddate}`)
            .end((err, result) => {
                result.should.have.status(400)
                result.should.have.property('body').haveOwnProperty('message').not.eq('success')
                result.should.have.property('body').haveOwnProperty('payload').a('object')
                done()
            })
    })
    
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

describe('delete /api/kurs', () => {
    it('should not delete currency record', (done) => {
        
        request.delete('/api/kurs?date=11-11-2020')
        .end((err, result)=> {
            result.should.have.status(400)
            result.should.have.property('body').haveOwnProperty('message').not.eq('success')
            result.should.have.property('body').haveOwnProperty('payload').a('object')

            done()
        })
    })

    it('should delete currency record', (done) => {
        
        request.delete('/api/kurs?date=2021-02-01')
        .end((err, result)=> {
            result.should.have.status(200)
            result.should.have.property('body').haveOwnProperty('message').eq('success')
            // result.should.have.property('body').haveOwnProperty('payload').a('object').haveOwnProperty('symbol')

            done()
        })
    })
})