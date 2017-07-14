const fs = require('fs')
const getTasks = require('./get.js')
const printer = require('./printer')

const DATA_STORE = `${process.env.path}/tasks.json`

function addTask(name, cb) {
	getTasks((error, tasks) => {
		if (error) return cb(error)
		let id
		if (tasks.length === 0) {
			id = 1
		} else {
			id = tasks[tasks.length-1].id+1
		}
		const newTask = tasks.concat({id, name})
		const newTaskJson = JSON.stringify(newTask)
		fs.writeFile(DATA_STORE, newTaskJson, cb)
		printer.print('Created task ' + id + '.')
	})
}

module.exports = addTask