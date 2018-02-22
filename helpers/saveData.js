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

function getUserData(userId) {
    var retArr = [];
    var userRef = db.ref('users/' + userId);
    // ON the event 'VALUE', we need 2 callbacks, 1 to receive data, and 1 for error handling
    userRef.on('value', function(data) {
        // data.val() = gets the objects
        var details = data.val();
        // make the data into an Obj(?)
        var keys = Object.keys(details); // gets an array of all the keys in js Obj.
        console.log(keys);
        for (var i = 0; i < keys.lenght; i++) {
            var k = keys[i];
            var lang = details[k].language; // goes over each key/title and gets the val for 'lang'
            console.log(lang);
            retArr.push(lang);
        }
        console.log(retArr);
    }, function(error) {
        console.log("Error! " + error);
    });
    return (retArr);
    // function(snapshot) {
    //     isSet = snapshot.val().language;
    // }, function (errorObj) {
    //     if (errorObj.code) {
    //         console.log("Error in getting user's data: " + errorObj.code);
    //     }
    // });
    // console.log("isSET: " + isSet);
    // return isSet;
}

module.exports = (cmd, userId, language) => {
    var returnStr = "";
    if (cmd === "set") {
        writeUserData(userId, language);
    } else if (cmd === "get") {
        var retArr = getUserData(userId);
        console.log("BEFORE EXPORT: ")
        console.log(retArr);
        returnStr += "GET DATA" + retArr[0];
    }
    return returnStr;
};