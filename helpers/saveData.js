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

// get reference to the 'users' node in db
//var usersRef = db.ref('users');

// set() overwrites the data @ specified location
function writeUserData(userId, confirm, language) {
    db.ref('users/' + userId).set({
        practice: confirm,
        language: language
    });
}

module.exports = (userId, confirm, language) => {

    console.log(">> in SaveData <<");
    console.log("id: " + userId + " language: " + language);
    writeUserData(userId, confirm, language);
};