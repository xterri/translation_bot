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
}

function getUserData(userId) {
    db.ref('users/' + userId).once('value')
        .then(function(snapshot) {
            let isSet = snapshot.val().language;
            console.log("isSet lang: " + isSet);
            return (true);
        })
        .catch(e => {
            console.log(e);
        });
    return (false);
}

module.exports = (cmd, userId, language) => {
    if (cmd === "set") {
        writeUserData(userId, language);
    } else if (cmd === "get") {
        return getUserData(userId);
    }
};