process.env.path = '.'
const addTask = require('./commands/add')
const list = require('./commands/list')
const completedTask = require('./commands/done')

function run() {
	let action = process.argv[2]
	switch (action) {
	case 'add':
		let name = process.argv[3]
		addTask(name, error => {
			if (error) throw error
		})
		break
	case 'done':
		let id = process.argv[3]
		completedTask(id, error => {
			if (error) throw error
		})
		break
	default:
		list()
	}
}

run()