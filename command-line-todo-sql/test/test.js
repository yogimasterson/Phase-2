const chai = require('chai')
const { expect } = require('chai')
const printer = require('./printer')

const {
	listQuery,
	addQuery,
	deleteQuery,
	updateQuery,
	notFound
} = require('../database/queries.js')

beforeEach((data) => {
	
})

describe('listQuery', () => {
	it('should return a table containing the task id and descriptions as well as counting the total ammount of tasks at the bottom', () => {
		expect(listQuery())
	})
})

describe('notFound', () => {
	it('should return an error message and list the specific commands required to interact with the database', () => {
		expect(notFound('vegitate')).to.be.a('string')
		expect(notFound('vegitate')).to.equal(`Sorry: command \`vegitate\` not recognized :(\nAccepted commands are\nlist\nadd\nupdate\ndelete`)
	})
})