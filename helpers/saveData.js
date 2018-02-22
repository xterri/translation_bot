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

// get db; reference to the parent key
const db = app.database();
// const tableRef = "db.ref('<column name>')" [or] "db.child('<column name>')"
// tableRef.orderFunction().queryFunction(); 
    //orderFunction examples:
        // orderByKey (by child's keys)
        // orderByChild (like WHERE in SQL; keyName = keyValue)
        // orderByValue (children orderd by Values, ex. numeric values)
        // orderByPriority (ignored, should be able to do it with orderByChild)
    //queryFunction examples:
        // startAt('value/key') >> used to create a range query
        // endAt('value/key') >> used for range query (keyName.equalTo('name'))
        // equalTo('child_key') >> like WHERE clause in SQL
        // limitToFirst(10) >> select top 10 rows
        // limitToLast(10) >> select bottom 10 rows
// set() overwrites the data @ specified location

function writeUserData(userId, language) {
    db.ref('users/' + userId).set({
        language: language
    });
}

// function getUserData(userId) {
//     var langSet = "";
//     db.ref('users/' + userId).once('value', function(snapshot) {
//         console.log(snapshot.val().language);
//         langSet += snapshot.val().language.toString();
//         if (typeof langSet === string)
//             console.log("langset is string: " + langSet);
//     }, function (errorObj) {
//         if (errorObj.code) {
//             console.log("Error in getting user's data: " + errorObj.code);
//         }
//     });
//     console.log("isSET: " + langSet);
//     return langSet;
// }

module.exports = (cmd, userId, language) => {
    if (cmd === "set") {
        writeUserData(userId, language);
        return "SET OK\t";
    } else if (cmd === "get") {
        return (function() {
            var ok;
            db.ref('users/' + userId).once('value', function(snapshot) {
                if (snapshot.val().language) {
                    ok = true;
                    console.log("langset is string: " + ok);
                    return ok;
                }
            });
        });
    }
};