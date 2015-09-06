var fs = require('fs');

var patches = ['prepatch', 'postpatch']
var types = ['normal', 'ranked']
var names = ['BR', 'EUNE', 'EUW', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR']


var Firebase = require('Firebase')

var ref = new Firebase('https://apitemdataset.firebaseio.com')
for(var h = 0; h < patches.length; h++){
	for(var j = 0; j < types.length; j++){
		for(var i = 0; i < names.length; i++){
			//if(patches[h] != 'prepatch' && types[j] != 'normal'){
				var obj = JSON.parse(fs.readFileSync(patches[h] + '/' + types[j] + '/' + names[i] + '.json', 'utf8'));
				ref.child(patches[h]).child(types[j]).child(names[i]).set(obj)
			//}
			
		}
	}
}


