// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase);

// var firestore = admin.firestore();

exports.practice = functions.https.onRequest((request, response) => {
	// let userId = request.body.sessionId;

	// check db for user's file and date (?)
		// set up timer? or "switch" to see if user has indicated they want translation or not
	// if user has no text saved, save text into DB
		// return prompt to ask if user would like to converse in ___ language

	response.send({
		speech: "Alright, let's practice"
	});
});
