import fire from "../src/fire";
// var firebase = require('firebase');

// let config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: "tranbot-1.firebaseapp.com",
//     databaseURL: "https://tranbot-1.firebaseio.com",
//     projectId: "tranbot-1",
//     storageBucket: "tranbot-1.appspot.com",
//     messagingSenderId: process.env.FIREBASE_SENDER_ID
// };

// let app = firebase.initializeApp(config);

// get db
    //let db = app.database();

// get reference to the 'users' node in db
    //let usersRef = db.ref('users');

// create reference to users in Firebase Database
let usersRef = fire.database().ref('users').orderByKey();

module.exports = (userId, confirm, language) => {

    console.log(">> in SaveData <<");
    console.log("id: " + userId + " language: " + language);
    // let userRef = usersRef.ref(userId);
    usersRef.push({
        id: userId,
        practice: confirm,
        language: language
    });
};