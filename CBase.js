//***** gestion de la base
// @ map = (request, response, info)

let connection = require('./CBasedb')

class CBase {

	static readUsers(){
		var users = new Object()
		users.dlievre = 'dominique LIEVRE'
		users.tpasqual = 'Thierry PASQUALINI'
		return(users)
	}

}


module.exports = CBase