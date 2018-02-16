/*
** Save User's information and pass to a Firbase Database
*/
const admin = require('firebase-admin');
var serviceAccount = require('../tranbot-1-firebase-adminsdk-cdlvz-1256567280.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tranbot-1.firebaseio.com"
});

var firestore = admin.firestore();

module.exports = (userId, confirm, language) => {
    let saveToDb = {
        id: userId,
        practice: confirm,
        language: language
    }
    firestore.collection('translateSettings').add(saveToDb)
    .then(() => {
        return `Okay! Let's practice ${language}!`;
    })
    .catch((e => {
        return "An error occurred. Cannot save to database.";
    }))
};