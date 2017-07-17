const chai = require('chai')
const { expect } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const {
	listQuery,
	addQuery,
	deleteQuery,
	updateQuery,
	notFound
} = require('../database/queries.js')
const printer = require('../printer.js')

describe('listQuery', () => {
	it('should return a table containing the task id and descriptions as well as counting the total ammount of tasks', () => {
		let output = ''
		sinon.stub(printer, 'print', str => {output += str})
		return listQuery()
			.then(() => {
				console.log(output)
				expect(output).to.eq(
					'ID DESCRIPTION' +
					'-- -----------' +
					'1 drink milk' +
					'2 eat a pie' +
					'\n' +
					'2 tasks.'
				)
			})
	})
})

describe('notFound', () => {
	it('should return an error message and list the specific commands required to interact with the database', () => {
		expect(notFound('vegitate')).to.be.a('string')
		expect(notFound('vegitate')).to.equal(
			`Sorry: command \`vegitate\` not recognized :(\n` +
			'Accepted commands are\n' +
			'list\n' +
			'add\n' +
			'update\n' +
			'delete')
	})
})