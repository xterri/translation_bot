var firebase = require('firebase');

var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "tranbot-1.firebaseapp.com",
    databaseURL: "https://tranbot-1.firebaseio.com",
    projectId: "tranbot-1",
    storageBucket: "tranbot-1.appspot.com",
    messagingSenderId: process.env.FIREBASE_SENDER_ID
};

var app = firebase.initializeApp(config);

// get db
var db = app.database();

// set() overwrites the data @ specified location
function writeUserData(userId, language) {
    db.ref('users/' + userId).set({
        language: language
    });
    return "writeUserData OK\n";
}

function getUserData(userId) {
    db.ref('users/' + userId).once('value', function(snapshot) {
        var isSet = snapshot.val().language;
    
        if (isSet) {
            return "getUserData OK\n";
        }
    });
    return "getUserData FAIL\n";
}

module.exports = (cmd, userId, language) => {
    var returnStr = "";
    if (cmd === "set") {
        returnStr += "SETTING DATA: " + writeUserData(userId, language);
    } else if (cmd === "get") {
        returnStr += "GETTING DATA: " + getUserData(userId);
    }
    return returnStr;
};