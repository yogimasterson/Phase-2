const fs = require('fs')
const printer = require('./printer')

const DATA_STORE = `${process.env.path}/tasks.json`

function list(callback) {
	fs.readFile(DATA_STORE, 'utf8', (err, data) => {
		if (err) throw err
		const taskArray = JSON.parse(data)
		printer.print('ID Description')
		printer.print('-- -----------')
		taskArray.forEach((task) => {
			printer.print(`${JSON.stringify(task.id)}  ${JSON.stringify(task.name)}`)
		})
		if (callback) {
			callback()
		}
	})
}

module.exports = list