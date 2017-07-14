const fs = require('fs')
const getTasks = require('./get.js')
const printer = require('./printer')

const DATA_STORE = `${process.env.path}/tasks.json`

const completedTask = (TaskId, cb) => {
	getTasks((error, tasks) => {
		if (error) return cb(error)
		tasks.forEach((task) => {
			if (task.id == TaskId) {
				printer.print(`Completed the task '${task.name}'`)
				tasks.splice(tasks.indexOf(task), 1)
			}
		})
		const updatedTasksJson = JSON.stringify(tasks)
		fs.writeFile(DATA_STORE, updatedTasksJson, cb)
	})
}
	
module.exports = completedTask