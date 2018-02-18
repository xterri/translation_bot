var firebase = require('firebase');

let config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "tranbot-1.firebaseapp.com",
    databaseURL: "https://tranbot-1.firebaseio.com",
    projectId: "tranbot-1",
    storageBucket: "tranbot-1.appspot.com",
    messagingSenderId: process.env.FIREBASE_SENDER_ID
};

let app = firebase.initializeApp(config);

// get db
let db = app.database();

// get reference to the 'users' node in db
let usersRef = db.ref('users');

module.exports = (userId, confirm, language) => {
    console.log(">> in SaveData <<");
    console.log("id: " + userId + " language: " + language);
    let userRef = usersRef.ref(userId);
    userRef.push({
        id: userId,
        practice: confirm,
        language: language
    });
};