//***** connection à la base
// @ map = (request, response, info)

let mysql = require('mysql')

var connection = mysql.createConnection({

		//mysql:dbname=db665127288;host=db665127288.db.1and1.com;"
		host : 'db665127288.db.1and1.com',
		user : 'dbo665127288',
		password : '42piscinedltp',
		database : 'db665127288'

	})

connection.connect()

module.exports = connection
