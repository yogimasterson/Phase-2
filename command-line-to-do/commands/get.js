const fs = require('fs')

const DATA_STORE = `${process.env.path}/tasks.json`

function getTasks(cb) {
	fs.readFile(DATA_STORE, (error, data) => {
		if (error) throw error
		const tasks = JSON.parse(data)
		cb(null, tasks)
	})
}

module.exports = getTasks