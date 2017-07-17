const chai = require('chai')
const { expect } = require('chai')
const chaiAsPromised = require('chai-as-promised')
require('sepia')

chai.use(chaiAsPromised)

const queryIMDB = require('./index.js')

describe('queryIMDB', function () {
	
	it('should return an array of movie names and dates', function (done) {
		queryIMDB('nemo')
			.then(result => {
				expect(result).to.be.a('string')
				expect(result).to.eql(' Nemo (1984) \n Nemo (1990) (Video Game) ')
				done()
			})
	})
	
	it('should return an unresolved promise', function (done) {
		queryIMDB('')
			.then(result => {
				expect(result).to.eql('')
				done()
			})
	})
})