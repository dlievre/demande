console.log('serveur start')
// depuis la video : https://www.youtube.com/watch?v=Q8wacXNngXs

// ***** Middleware *****
// @ express - module
var express = require('express')
var app = express()

// @ body-parser, formate le request d'un form
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // pour format json
var multer = require('multer')
var upload = multer()
app.use(bodyParser.json()) //parsing application json
app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded

// @ gestion des cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// @ gestion des sessions
let session = require('express-session')
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mykey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// pour une utilisation de session en production : utiliser redis : https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/

// @ gestion des requete http
let reqhttp = require('request')// module requete http


// ***** moteur template *****
app.set('view engine', 'ejs')
app.use(express.static('public')) // route static du dossier public

var init = 'init';

// ***** routes *****
app.get('/superuser', upload.array(), (request, response) => {
	var sess = request.session
	console.log('srv link superuser')
//	var test = require('./test')
	// app.use(test())
	// var b = test
	// var c = b.readcode
	// console.log(c)
	// response.render('pages/index', {menu: 'index', niv: "voirie", msg:"Intervention voirie", info: 'test' })


//console.log(typeof tools.readcode)
//var test = superuser()
//app.use(superuser.readcode())

//console.log('test.readcode '+ test.readcode)

})

app.post('/', upload.array(), (request, response) => {
	var sess = request.session

	var info = new Object()
	info.titre_demande = "Dernières demandes"
	info.page = 'pages/index'
	var menu = 'index'

		if (request.body.voirie){
			init = 'non'
			info.menu = 'index'
			info.page = 'pages/index'
			info.niv =  'voirie'
			info.msg = 'Intervention voirie'
			info.saisie = 'no'


	}
		if (request.body.voirie_encombrant){
			info.menu = 'index'
			info.page = 'pages/index'
			info.niv =  'voirie_encombrant'
			info.msg = 'Intervention voirie'
			info.saisie = 'no'
	}

		if (request.body.voirie_mobilier){
			info.menu = 'index'
			info.page = 'pages/index'
			info.niv =  'voirie_mobilier'
			info.msg = 'Intervention voirie'
			info.saisie = 'yes'
			//response.render('pages/index', {menu, niv: "voirie_mobilier", msg:"Intervention voirie - Encombrant : Mobilier", saisie: 'ok', info })
	}
		if (request.body.accident){
			info.menu = 'index'
			info.page = 'pages/index'
			info.niv =  'accident'
			info.msg = 'Information : accident'
			info.saisie = 'no'
			//response.render('pages/index', {menu, niv: "accident", msg:"Information : accident", saisie: 'no', info })
	}
		if (request.body.accident_route){
			info.menu = 'index'
			info.page = 'pages/index'
			info.niv =  'accident_route'
			info.msg = 'Information : accident de la route'
			info.saisie = 'no'
			//response.render('pages/index', {menu, niv: "accident_route", msg:"Information : accident de la route", saisie: 'no', info })
	}
		if (request.body.accident_grave){
			info.menu = 'index'
			info.page = 'pages/index'
			info.niv =  'accident_grave'
			info.msg = 'Information :  accident grave de la route'
			info.saisie = 'yes'
			//response.render('pages/index', {menu, niv: "accident_grave", msg:"Information :  accident grave de la route", saisie: 'ok' })
	}
		if (request.body.litige === 'ok' ){
			init = 'non'
			response.render('pages/index', {menu, niv: "litige", msg:"Information : litige", btn: ['interne', 'client', 'commercial'] })
	}

		if (request.body.message){
			info.menu = 'index'
			info.page = 'pages/index'
			info.niv =  ''
			info.msg = 'Votre message est transmis au service concerné : '+request.body.demande+' : '+request.body.message
			info.saisie = 'no'
	}
		if (request.body.aide === 'ok' ){
			var msg = 'débrouille-toi'
		response.render('pages/index', {msg})
	}

if (request.body.mapbaudin){ 
	info.menu = 'map'
	info.page = 'pages/map'
	info.adresse = request.body.mapbaudin
	map(request, response, info)
	
}

	if (info.menu != 'map') response.render(info.page, { info })


	console.log('Post')
	console.log('init = '+init)
	console.log(request.body)
	console.log('session = '+sess)
	console.log('Cookies: ', request.cookies)
	console.log('Signed Cookies: ', request.signedCookies)
	console.log('demande = '+request.body.demande)
	console.log('*** test objet = '+request.body.mapbaudin)
	console.log('message = '+request.body.message)
	console.log('accident = '+request.body.accident)
	console.log('voirie = '+request.body.voirie)
	console.log('niv = '+request.body.niv)

	//console.log('niv '+request.body.niv)
})

	app.get('/map', upload.array(), (request, response) => {
	var sess = request.session

	var info = new Object()
	info.menu = 'map'
	info.page = 'pages/map'
	info.adresse = '255, avenue des champs-elysees, paris'
	info.lat = 48.8946566
	info.long = 2.2753577

	info.lat =  48.8965715
    info.long =  2.2808611

console.log ('map : '+info.adresse)
	map(request, response, info)


	//response.render('pages/map', {menu, msg: '3, rue Baudin - Levallois Perret'})

    // var openadresse = function(adresse, callback){
    //    adresse = adresse.replace(/^\s*|\s*$/,'')
    //    adresse = adresse.replace(/[ ]{2,}/, '%20')
    //    var latitude 
    //    var longitude
    //     //var url = "http://nominatim.openstreetmap.org/search.php?q=125%3rue%20baudin,Levallois-perret%20,%20france&format=json" 
    //     var url = "http://nominatim.openstreetmap.org/search.php?q="+adresse+"&format=json" 
    //     reqhttp(url, function(err, response, body){
    //       try{
    //         var result = JSON.parse(body)
    //         latitude = result[0].lat
    //         longitude = result[0].lon
    //         callback(result)
    //        }
    //        catch(e){
    //          callback(e)
    //        }
    //     })
    // }
    // openadresse(info.adresse,  function (latlong){
    //  //if (err) return console.log(err);
    //  response.render(info.page, {info, lat: latlong[0].lat, lon: latlong[0].lon})
    // })

})


app.get('/', (request, response) => {
	var sess = request.session
	var info = new Object()

	info.menu = 'index'
	info.page = 'pages/index'
	info.niv =  'home'
	info.msg = ''
	info.text = "Choisissez l'évènement"
	info.saisie = 'no'

	info.titre_demande = "Dernières demandes"
	info.titre = 'info'
	response.render(info.page, {info})
	console.log('Get = '+request.body)
})

app.listen(8081)

function map (request, response, info){
	if (info.adresse && !info.lat){
	    var openadresse = function(adresse, callback){
	       adresse = adresse.replace(/^\s*|\s*$/,'')
	       adresse = adresse.replace(/[ ]{2,}/, '%20')
	        //var url = "http://nominatim.openstreetmap.org/search.php?q=125%3rue%20baudin,Levallois-perret%20,%20france&format=json" 
	        var url = "http://nominatim.openstreetmap.org/search.php?q="+adresse+"&format=json" 
	        reqhttp(url, function(err, response, body){
				try{
			        var result = JSON.parse(body)
			        callback(result)
				}
				catch(e){
		        	callback(e)
				}
	        })
	    }
	    
	    openadresse(info.adresse,  function (latlong)
	    {
	     //if (err) return console.log(err);
   		response.render(info.page, {info, lat: latlong[0].lat, lon: latlong[0].lon})
		})
  
    } // info.adresse
   	if (info.lat){
		response.render(info.page, {info, lat: info.lat, lon: info.long})
	}
}

function test(request, response, info){
}