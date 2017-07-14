const printer = require('../printer')
const promise = require('bluebird')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/todo_list'
const db = pgp(connectionString)

//list

const listQuery = () => {
	return db.any('SELECT * FROM todos')
		.then((data) => {
			printer.print('ID DESCRIPTION')
			printer.print('-- -----------')
			data.forEach((todos) => {
				printer.print(todos.id + ' ' + todos.task)
			})
			printer.print('')
			printer.print(data.length + ' tasks.')
		})
}

//add

const addQuery = () => {

}

//delete

const deleteQuery = () => {
	
}

//update

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