
var ref = new Firebase('https://filehost.firebaseio.com/');

var username = ''
var token = localStorage.getItem('token');
if(token == null){
  token = "No Token"
}


//createUser('rohan@techlabeducation.com', 'jenga') //this should be called from html when a button is pressed or something

ref.authWithCustomToken(token, function(error, result) {
  if (error) {
    console.log("No pre-existing token found");
  } else {
    console.log(result)
    console.log("Pre-existing token found");
  }
});

function createAccount() {
    createUser($('#regemail').val(), $('#regpassword').val(), $('#regusername').val())
   // login($('#regemail').val(), $('#regpassword').val())
}

function createUser(email, password, user){
    ref.createUser({
        email    : email,
        password : password
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            ref.child('user').child(user).set({
                settings: {
                    email: email,
                    uid: userData.uid
                }
            })
        }
    });
}


function login(email, password, user){
    ref.authWithPassword({
        email    : email,
        password : password
    }, function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            token = authData.token;
            localStorage.setItem('token', token);
            username = user;
            
        }
    });
}

function loginAction(){
    var username = $('#loginusername').val()

    ref.child('user').child(username).once('value', function(snapshot){
        var value = snapshot.val()
        console.log(value)
        var email = value.settings.email
        console.log(email)
        login(email, $('#loginpassword').val(), $('#loginusername').val())
    })
}

function logout(){
    ref.unauth();
    localStorage.removeItem('token');
    user = 'loggedOut'
}

//checks any changes in user authentication
ref.onAuth(function(){
    if(ref.getAuth() == null){
        $("#loginstatus").css("color", "red");
    }else{
        $("#loginstatus").css("color", "green");
    }
});

// Debug code
function deleteUser(email, password, user){
    ref.removeUser({
        email: email,
        password: password
    }, function(error) {
        if (error) {
            switch (error.code) {
                case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                    break;
                case "INVALID_PASSWORD":
                    console.log("The specified user account password is incorrect.");
                    break;
                default:
                    console.log("Error removing user:", error);
            }
        } else {
            ref.child("users").child(user).remove();
            console.log("User account deleted successfully!");
        }
    });
}
