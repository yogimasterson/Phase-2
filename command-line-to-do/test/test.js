process.env.path = './test'
const fs = require('fs')
const chai = require('chai')
const { expect } = require('chai')
const chaiChange = require('chai-change')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const addTask = require('../commands/add')
const completedTask = require('../commands/done')
const list = require('../commands/list')
const printer = require('../commands/printer')

const TEST_DATA_STORE = './test/tasks.json'

chai.use(sinonChai)
chai.use(chaiChange)

describe('addTask', function () {
	before(function () {
		if (fs.existsSync(TEST_DATA_STORE) === false) {
			fs.openSync(TEST_DATA_STORE, 'a')
			fs.writeFileSync(TEST_DATA_STORE, '[]', (err) => {
				if (err) throw err
			})
		} else {
			fs.openSync(TEST_DATA_STORE, 'w')
			fs.writeFileSync(TEST_DATA_STORE, '[]', (err) => {
				if (err) throw err
			})
		}
	})
	it('should add task into the JSON file', function (done) {
		addTask('buy butter', error => {
			if (error) {
				throw error
				done()
			} else {
				expect(fs.readFileSync(TEST_DATA_STORE, 'utf8', (err) => {
					if (err) throw err
				})).to.equal('[{"id":1,"name":"buy butter"}]')
				done()
			}
		})
	})
})

describe('completedTask', function () {
	before(function () {
		if (fs.existsSync(TEST_DATA_STORE) === false) {
			fs.openSync(TEST_DATA_STORE, 'a')
			fs.writeFileSync(TEST_DATA_STORE, '[{"id":1,"name":"buy butter"}]', (err) => {
				if (err) throw err
			})
		} else {
			fs.openSync(TEST_DATA_STORE, 'w')
			fs.writeFileSync(TEST_DATA_STORE, '[{"id":1,"name":"buy butter"}]', (err) => {
				if (err) throw err
			})
		}
	})	
	it('should delete a task from the JSON file', function (done) {
		completedTask('1', error => {
			if (error) {
				throw error
				done()
			} else {
				expect(fs.readFileSync(TEST_DATA_STORE, 'utf8')).to.equal('[]')
				done()
			}
		})
	})
})

describe('list', function () {
	before(function () {
		if (fs.existsSync(TEST_DATA_STORE) === false) {
			fs.openSync(TEST_DATA_STORE, 'a')
			fs.writeFileSync(TEST_DATA_STORE, '[{"id":1,"name":"buy butter"}]', (err) => {
				if (err) throw err
			})
		} else {
			fs.openSync(TEST_DATA_STORE, 'w')
			fs.writeFileSync(TEST_DATA_STORE, '[{"id":1,"name":"buy butter"}]', (err) => {
				if (err) throw err
			})
		}
	})
	it('should list the task formated into the terminal', function (done) {
		const print = sinon.stub(printer, 'print')
		list(function () {
			expect(print).to.have.been.calledWith('ID Description')
			expect(print).to.have.been.calledWith('-- -----------')
			expect(print).to.have.been.calledWith('1  "buy butter"')
			done()
		})
	})
})