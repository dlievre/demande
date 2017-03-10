console.log('serveur start')
// depuis la video : https://www.youtube.com/watch?v=Q8wacXNngXs

// init express
var express = require('express')
var app = express()

// ***** Middleware *****
// init body-parser, format request d'un form
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // pour format json
var multer = require('multer')
var upload = multer()
app.use(bodyParser.json()) //parsing application json
app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded

// inclure la gestion des cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// inclure la gestion des sessions
let session = require('express-session')
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mykey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// pour une utilisation de session en production : utiliser redis : https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/



// ***** moteur template *****
app.set('view engine', 'ejs')
app.use(express.static('public')) // route static du dossier public

var init = 'init';

// ***** routes *****
app.post('/', upload.array(), (request, response) => {
	var sess = request.session

	var info = new Object()
	info.titre_demande = "Dernières demandes"
	var menu = 'index'

		if (request.body.voirie){
			init = 'non'
			response.render('pages/index', {menu, niv: "voirie", msg:"Intervention voirie", info })
	}
		if (request.body.voirie_encombrant){
			response.render('pages/index', {niv: "voirie_encombrant", msg:"Intervention voirie - Encombrant", saisie: 'ok', info })
	}

		if (request.body.accident){
			response.render('pages/index', {niv: "accident", msg:"Information : accident", saisie: 'no', info })
	}
		if (request.body.accident_route === 'ok' ){
			response.render('pages/index', {niv: "accident_route", msg:"Information : accident de la route", saisie: 'no', info })
	}
		if (request.body.accident_grave === 'ok' ){
			response.render('pages/index', {niv: "accident_grave", msg:"Information :  accident grave de la route", saisie: 'ok' })
	}
		if (request.body.litige === 'ok' ){
			init = 'non'
			response.render('pages/index', {niv: "litige", msg:"Information : litige", btn: ['interne', 'client', 'commercial'] })
	}

		if (request.body.message){
			msg = 'Votre message est transmis : '+request.body.demande+' : '+request.body.message
		response.render('pages/index', {msg, saisie: 'no', info})
	}
		if (request.body.aide === 'ok' ){
			var msg = 'débrouille-toi'
		response.render('pages/index', {msg})
	}



	// 		if (request.body.urgence == true){
	// 	console.log('urgence niveau2')
	// 	response.render('pages/index', {niv: "niv2" })
	// }
	console.log('Post')
	console.log('init = '+init)
	console.log(request.body)
	//console.log(request.body.aide)
	//console.log('aide = '+request.body.aide)
	console.log('session = '+sess)
	console.log('Cookies: ', request.cookies)
	console.log('Signed Cookies: ', request.signedCookies)
	console.log('demande = '+request.body.demande)
	console.log('message = '+request.body.message)
	console.log('accident = '+request.body.accident)
	console.log('voirie = '+request.body.voirie)
	console.log('niv = '+request.body.niv)

	//console.log('niv '+request.body.niv)
})

app.get('/map', upload.array(), (request, response) => {
	var sess = request.session
	var menu = 'map'
	response.render('pages/map', {menu, msg: '3, rue Baudin - Levallois Perret'})
})


app.get('/', (request, response) => {
	var sess = request.session
	var menu = 'index'
	var test = Date.now();
	var test = Date('year')
	//response.render('pages/index', {test: 'salut'})
	var info = new Object()
	info.titre_demande = "Dernières demandes"
	info.titre = 'info'
	info.text = "Choisissez l'évènement"
	response.render('pages/index', {menu, info})
	console.log('Get = '+request.body)
})

app.listen(8081)


