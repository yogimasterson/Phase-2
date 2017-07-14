const printer = require('../printer')
const promise = require('bluebird')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/todo_list'
const db = pgp(connectionString)

const listQuery = () => {
	return db.any('SELECT * FROM todos')
		.then((data) => {
			printer.print('ID DESCRIPTION')
			printer.print('-- -----------')
			data.forEach((todos) => {
				printer.print(todos.id + ' ' + todos.task)
			})
			printer.print('\n' + data.length + ' tasks.')
		})
}

const addQuery = (taskItem) => {
	return db.oneOrNone('INSERT INTO todos(task) VALUES($1) RETURNING id', taskItem)
		.then(newTask => {
			printer.print('Created task ' + newTask.id)
		})
}

const deleteQuery = (taskItem) => {
	return db.oneOrNone('DELETE FROM todos WHERE id = $1 RETURNING task', taskItem)
		.then(newTask => {
			printer.print('Completed the task ' + newTask.task)
		})
}

const updateQuery = () => {
	
}

//notFound

const notFound = (command) => {
	const errorMessage = `Sorry: command \`${command}\` not recognized :(\nAccepted commands are\nlist\nadd\nupdate\ndelete`
	if (process.env.NODE_ENV !== 'test') {
		printer.print(errorMessage)
	}
	return errorMessage
}

module.exports = {
	listQuery,
	addQuery,
	deleteQuery,
	updateQuery,
	notFound
}