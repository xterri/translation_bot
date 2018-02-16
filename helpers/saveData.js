/*
** Save User's information and pass to a Firbase Database
*/
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

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