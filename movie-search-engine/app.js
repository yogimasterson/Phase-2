const express = require('express')
const bodyParser = require('body-parser')
const promise = require('bluebird')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const queryIMDB = require('./api.js')

const options = {
	promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = ('postgres://localhost:5432/movies')
const db = pgp(connectionString)

const app = express()

//middleware
app.use(bodyParser.urlencoded({
	extends: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat' }))

app.set('view engine', 'ejs')

let err = ''
app.locals.err = err

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.get('/login', (req, res) => {
	res.render('login.ejs')
})

app.post('/login', (req, res) => {
	
})

app.get('/register', (req, res) => {
	res.render('register.ejs')
})

app.post('/register', (req, res) => {
	db.none('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', [req.body.name, req.body.email, req.body.password])
		.then( () => {
			res.redirect('/search')
		})
		.catch((error) => {
			err = 'Email is already registered, try another.'
			if (err) {
				res.render('login.ejs', {err: err})
			}
		})
})

app.get('/search', (req, res) => {
	res.render('search.ejs')
})

app.post('/search', (req, res) => {
	queryIMDB(req.body.search)
})

const port = 3000

app.listen(port, () => {
	console.log('Express server runnin on port:', port)
})