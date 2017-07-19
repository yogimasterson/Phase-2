const express = require('express')
const bodyParser = require('body-parser')
const sessions = require('client-sessions')
const promise = require('bluebird')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/http_auth'
const db = pgp(connectionString)

const app = express()
app.set('view engine', 'ejs')
app.locals.pretty = true //creates a snapshot of the generated HTML code prior to DOM manipulation

// middleware
app.use(bodyParser.urlencoded({ extends: true }))

app.use(sessions({
	cookieName: 'session',
	secret: 'lkhsakjdf678y32498hf768974',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}))

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.get('/signup', (req, res) => {
	res.render('signup.ejs')
})

app.post('/signup', (req, res) => {
	db.oneOrNone('INSERT INTO users(email, password) VALUES($1, $2) RETURNING email', [req.body.email, req.body.password])
		.then((data) => {
			req.session.email = data.email
			res.render('user.ejs', { data: req.session.email })
		})
		.catch(() => {
			const err = 'Email already exists, try another.'
			res.render('signup.ejs', {err: err})
		})
})

const port = 3000

app.listen(port, () => {
	console.log('Express server running on port:', port)
})