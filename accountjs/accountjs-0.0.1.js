"use strict";
var AccountJS = function() {
  function AccountJS(firebaseURL) {
    this.ref = new Firebase(firebaseURL);
    this.user = '';
    this.token = localStorage.getItem('TOKEN NAME');
    if (token == null) {
      token = "No Token";
    }
    ref.authWithCustomToken(token, function(error, result) {
      if (error) {
        console.log("No pre-existing token found");
      } else {
        console.log("Pre-existing token found");
        user = result.uid;
      }
    });
  }
  return ($traceurRuntime.createClass)(AccountJS, {
    /**
     * Creates a new Firebase user with Email and Password Authentication
     * @function createUser
     * @param  {string} - The user's email
     * @param  {tring} - The user's password
     * @param  {Function} - Optional callback function with parameter userData. (Called upon successful account creation)
     */
    createUser: function(email, password, callback) {
      ref.createUser({
        email: email,
        password: password
      }, function(error, userData) {
        if (error) {
          throw error;
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          if (typeof callback === "function") {
            callback(userData);
          }
        }
      });
    },
    /**
     * Logs in a Firebase user with Email and Password Authentication
     * @function loginWithEmail
     * @param  {string} - The user's email
     * @param  {string} - The user's password
     * @param  {boolean} - True to create an auth token, false to not create one.
     * @param  {function} - Optional callback function with parameter authData. (Called upon successful login)
     */
    loginWithEmail: function(email, password, token, callback) {
      ref.authWithPassword({
        email: email,
        password: password
      }, function authHandler(error, authData) {
        if (error) {
          throw error;
        } else {
          console.log("Authenticated successfully with payload:", authData);
          user = authData.uid;
          if (token) {
            token = authData.token;
            localStorage.setItem('TOKEN NAME', token);
          }
          if (typeof callback == "function") {
            callback(authData);
          }
        }
      });
    },
    /**
     * Logs out a user and removes authentication token.
     */
    logout: function() {
      ref.unauth();
      localStorage.removeItem('TOKEN NAME');
    },
    checkAuthChanges: function() {
      ref.onAuth(function() {
        if (ref.getAuth() == null) {} else {}
      });
    },
    /**
     * Deletes a Firebase user with Email and Password Authentication
     * @param  {string} - The user's email
     * @param  {string} - The user's password
     * @param  {Function} - Optional callback function. (Called upon successful account deletion)
     */
    deleteUserWithEmail: function(email, password, callback) {
      ref.removeUser({
        email: email,
        password: password
      }, function(error) {
        if (error) {
          switch (error.code) {
            case "INVALID_USER":
              throw "The specified user account does not exist.";
              break;
            case "INVALID_PASSWORD":
              throw "The specified user account password is incorrect.";
              break;
            default:
              throw error;
          }
        } else {
          console.log("User account deleted successfully!");
          callback();
        }
      });
    },
    checkIfEmailInString: function(text) {
      var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      return re.test(text);
    }
  }, {});
}();
