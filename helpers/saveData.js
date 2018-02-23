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

// Sources:
    // https://stackoverflow.com/questions/47566533/firebase-value-is-undefined-when-it-is-not-supposed-to-be
    // https://stackoverflow.com/questions/39302577/firebase-retrieving-data-asynchronously
    // https://medium.freecodecamp.org/how-to-write-beautiful-node-js-apis-using-async-await-and-the-firebase-database-befdf3a5ffee
async function getUserData(userId) {
    var dataVal;
    var retLang;
    // retVal = w/o "await" >> returns a promise; w/ "await" >> returns the obj
    var retVal = await db.ref('users/' + userId).once('value', function(snapshot) {
        dataVal = snapshot.val();
        retLang = dataVal.language;
    });
    console.log("dataVal: ");
    console.log(dataVal);
    console.log("retLang: " + retLang);
    return retLang;
    // return new Promise (function (resolve, reject) {
    //     try {
    //         db.ref('users/' + userId).once('value', function(snapshot) {
    //             if (typeof snapshot.val().language === 'undefined') {
    //                 console.log("error with snapshot/language");
    //                 resolve("Error with snapshot");
    //             } else {
    //                 resolve(snapshot.val().language);
    //             }
    //         })
    //     } catch (e) {
    //         reject(e);
    //     }
    // });
}

module.exports = (cmd, userId, language) => {
    if (cmd === "set") {
        writeUserData(userId, language);
    } else if (cmd === "get") {
        // result should receive a "promise" to resolve to get the "language"
        const result = Promise.all(getUserData(userId)
            .then(data => data));
        console.log("result: ");
        console.log(result);
        return result;
            // .then(function (result) {
            //     // whatever needs to be done, must be done in here, cannot pass values?
            //     console.log("result: " + result);
            //     // still having troubles doing checks & passing values / results
            //     return "true";
            // }).catch(function (error) {
            //     console.log(error);
            // });
    }
};