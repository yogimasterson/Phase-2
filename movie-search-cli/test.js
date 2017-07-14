const chai = require('chai')
const { expect } = require('chai')
require('sepia')

const queryIMDB = require('./index.js')

describe('queryIMDB', function () {
	it('should return an array of movie names and dates', function (done) {
		queryIMDB('nemo', function (err, results) {
			expect(results).to.be.an('array')
			expect(results).to.eql([ ' Nemo (1984) ', ' Nemo (1990) (Video Game) ' ])
			done()
		})
	})
})