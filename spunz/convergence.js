//Data structure
// Champion
// 	post/prepatch
// 		norms
//			Games: #
//			TotalGames: #
// 			Item
// 				ItemID
// 					Before %
// 					After %
// 		ranked
// 			Item
// 				ItemID
// 					Before %
// 					After %
	


var Firebase = require('Firebase')
//var matchgetter = require('./matchgetter')
//var regions =['BR', 'EUNE', 'EUW', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR']

var ref = new Firebase('https://apitemdataset.firebaseio.com')

var region = 'NA'



ref.child('prepatch').child('normal').child('NA').on('child_added', function(snapshot){
	
		
	var matchId = snapshot.val()
	console.log(region + ' ' + matchId)
	getMatch(matchId, region, function(match){
		console.log('also here?')
		var participants = match.participants
		
		for(var z in participants){
			if(participants[z].stats.item0){
				ref.child('request').push({
					path:'champion/' + participants[z].championId + '/prepatch/normal/item/' + participants[z].stats.item0 
				})
			}
			if(participants[z].stats.item1){
				ref.child('request').push({
					path:'champion/' + participants[z].championId + '/prepatch/normal/item/' + participants[z].stats.item1 
				})
			}
			if(participants[z].stats.item2){
				ref.child('request').push({
					path:'champion/' + participants[z].championId + '/prepatch/normal/item/' + participants[z].stats.item2
				})
			}
			if(participants[z].stats.item3){
				ref.child('request').push({
					path:'champion/' + participants[z].championId + '/prepatch/normal/item/' + participants[z].stats.item3 
				})
			}
			if(participants[z].stats.item4){
				ref.child('request').push({
					path:'champion/' + participants[z].championId + '/prepatch/normal/item/' + participants[z].stats.item4 
				})
			}
			if(participants[z].stats.item5){
				ref.child('request').push({
					path:'champion/' + participants[z].championId + '/prepatch/normal/item/' + participants[z].stats.item5 
				})
			}
			if(participants[z].stats.item6){
				ref.child('request').push({
					path:'champion/' + participants[z].championId + '/prepatch/normal/item/' + participants[z].stats.item6 
				})
			}

			console.log(participants[z].stats.item0)
		}
	})

})
// var patch = 'prepatch'
// var type = 'normal'
// var region = 'BR'
// ref.child(patch).child(type).child('')

var request = require('request');
var API_KEY = '453adc7c-8a2a-448e-a6cc-9cd89daf33ac'


//Utility method for simple HTTP GET requests.
function httpGet(theUrl, callback){
	console.log('something is happening')
    request(theUrl, function (error, response, body){
    	
    	//console.log('body')
		if (!error && response.statusCode == 200){
			console.log('doin werk')
		  	callback(body) // Call the callback function passed in
		}else{
			console.log(response)
		}
		// }else if(response.statusCode == 403){
		// 	console.log('damnit out of requests for now')
		// }	
	})
}


var getMatch = function(matchId, region, callback){
	console.log('omg')
	var reg = region.toLowerCase()
	var url = 'https://' + reg + '.api.pvp.net/api/lol/' + reg + '/v2.2/match/' + matchId + '?api_key=' + API_KEY
	httpGet(url, function(match){
		console.log("called callback")
		callback(JSON.parse(match))
	})
}

var getItem = function (itemId, callback){
	var url = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/item/' + itemId + '?itemData=all&api_key=' + API_KEY
	httpGet(url, function(item){
		callback(JSON.parse(item))
	})
}