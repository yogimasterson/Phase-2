const express = require('express')
const bodyParser = require('body-parser')
const promise = require('bluebird')
const path = require('path')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = ('postgres://localhost:5432/movies')
const db = pgp(connectionString)

const app = express()
app.set('view engine', 'ejs')

//middleware
app.use(bodyParser.urlencoded({ extends: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
	res.render('index.ejs')
})

const port = 3000

app.listen(port, () => {
	console.log('Express server runnin on port:', port)
})