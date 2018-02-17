/*
** Save User's information and pass to a Firbase Database
*/
const admin = require('firebase-admin');
var serviceAccount = require('../tranbot-1-firebase-adminsdk-cdlvz-1256567280.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tranbot-1.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

module.exports = (userId, confirm, language) => {
    let saveToDb = {
        "users": {
            userId: {
                "practice": confirm,
                "language": language
            }
        }
    }

    // creating the db reference
    var usersRef = ref.child("users");
    // '.set' >> writes data to the db/path
    // see documentation for '.push' 
    usersRef.set(saveToDb)
    // ^ should see the json @ https://tranbot-1.firebaseio.com/users/[userId]/language
        // ^ page should display language user chose
    // JSON obj saved to db >> obj properties mapped to 'child' locations in nest fashion
    // can save data directly to child location
        //usersRef.child("[userId]").set({
            // practice: true,
            // language: [language]
        //})
    .then(() => {
        return `Okay! Let's practice ${language}!`;
    })
    .catch((e => {
        return "An error occurred. Cannot save to database.";
    }))
    //completion callback:
        // usersRef.set("[data to db]", function(error) {
        //     if (error) {
        //         alert("data could not be written. " + error);
        //     } else {
        //         alert("data saved");
        //     }
        // });
};

// update data:
    // var terriRef = usersRef.child("[userId]");
    // terriRef.update({
    //     "nickname": "terannosaur"
    // });
// or
    // usersRef.update({
    //     "[userId]/[category]": "[update]",
    //     "terri/nickname": "terannosaur"
    // });
// or
    // usersRef.update({
    //     "terri": {
    //         "nickname": "terannosaur"
    //     }
    // });