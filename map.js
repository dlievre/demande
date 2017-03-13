//***** gestio de la map
// @ map = (request, response, info)

let reqhttp = require('request')// module requete http

 map = (request, response, info) =>{
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

module.exports = map