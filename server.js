console.log('serveur start')
// depuis la video : https://www.youtube.com/watch?v=Q8wacXNngXs

// init express
var express = require('express')
var app = express()

// ***** Middleware *****
// init body-parser , format request d'un form
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // pour format json
var multer = require('multer')
var upload = multer()
app.use(bodyParser.json()) //parsing application json
app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded

// inclure la gestion des cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// ***** moteur template *****
app.set('view engine', 'ejs')
app.use(express.static('public')) // route static du dossier public

var init = 'init';

app.post('/', upload.array(), (request, response) => {
	// if (request.body.message === undefined || request.body.message === ''){
	// 	response.render('pages/index', {error: "vous n'avez pas saisi de message :"})
	// }

		if (request.body.accident === 'ok' ){
			init = 'non'
		response.render('pages/index', {niv: "accident", msg:"accident" })
	}
		if (request.body.accident_route === 'ok' ){
		response.render('pages/index', {niv: "accident_route", msg:"accident de la route" })
	}
		if (request.body.accident_grave === 'ok' ){
		response.render('pages/index', {niv: "accident_grave", msg:"accident grave de la route" })
	}

		if (request.body.aide === 'ok' ){
			var msg = 'débrouille-toi'
		response.render('pages/index', {msg})
	}

	// 		if (request.body.urgence == true){
	// 	console.log('urgence niveau2')
	// 	response.render('pages/index', {niv: "niv2" })
	// }
	console.log('init = '+init)
	console.log(request.body)
	//console.log(request.body.aide)
	//console.log('aide = '+request.body.aide)
	console.log('message = '+request.body.message)
	console.log('urgence = '+request.body.accident)
	console.log('niv = '+request.body.niv)

	//console.log('niv '+request.body.niv)
})

// ***** routes *****
app.get('/', (request, response) => {
	console.log('Cookies: ', request.cookies)
	console.log('Signed Cookies: ', request.signedCookies)
	var test = Date.now();
	var test = Date('year')
	//response.render('pages/index', {test: 'salut'})
	response.render('pages/index', {test})
	//response.send('ok')
})

app.listen(8081)


