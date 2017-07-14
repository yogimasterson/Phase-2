const http = require('http')
const querystring = require('querystring')
const cheerio = require('cheerio')

function queryIMDB(search, cb) {
	const query = querystring.stringify({
		ref_:'nv_sr_fn',
		q: search,
		s: 'all',
	})

	const requestOptions = {
		hostname: 'www.imdb.com',
		path: `/find?${query}`
	}

	const request = http.get(requestOptions, (response) => {
		let html = ''
		response.on('data', (chunk) => { html += chunk })
		response.on('end', () => {
			const movieNames = getMovieNames(html)
			cb(null, movieNames)
		})
	})
	request.on('error', cb)
}

function getMovieNames(html) {
	const $ = cheerio.load(html)
	const movieNames = $('.findSection')
		.first()
		.find('.result_text')
		.map((i, elem) => $(elem).text())
		.toArray()
	return movieNames
}

function run() {
	const search = process.argv[2].split(' ').join('+')

	queryIMDB(search, (err, movieNames) => {
		if (err) throw err
		console.log(movieNames.join('\n'))
	})
}

if (!module.parent) { 
	run()
}

module.exports = queryIMDB