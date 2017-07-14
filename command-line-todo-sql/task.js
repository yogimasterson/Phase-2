const { 
	listQuery,
	addQuery,
	deleteQuery,
	updateQuery,
	notFound
} = require('./database/queries')

const runToDoList = () => {
	const command = process.argv[2]
	const task = process.argv[3]
	const updateTask = process.argv[4]

	if (command === 'list') {
		listQuery()
			.then(() => {
				process.exit(0)
			})
			.catch((err) => {
				console.log(err.message)
				process.exit(1)
			})
	} else if (command === 'add') {
		add(task)
	}	else if (command == 'delete') {
		del(task)
	} else if (command === 'update') {
		update(task, updateTask)
	} else {
		notFound(command)
	}
}

runToDoList()
