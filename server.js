fs = require('fs');
var Firebase = require('firebase')
var ref = new Firebase('https://filehost.firebaseio.com')

ref.child('request').on('child_added', function(snapshot){
	var snap = snapshot.val()
	console.log(snap)
	createFile(snap.path, snap.body)
	snapshot.ref().remove()

})

// ref.child('request').on('child_added', function(childSnapshot, prevChildKey) {
// 	var snap = childSnapshot.value()
// });
function createFile(path,body){
	fs.writeFile(path, body, function (err) {
	  	if (err) return console.log(err);
	  	else console.log('Created file ' + path);
	});
	deploy()
}

function deploy(){
	var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec("firebase deploy", puts);
}

