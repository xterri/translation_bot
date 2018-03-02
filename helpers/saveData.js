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
    // https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8

function getUserData(userId) {
    var userRef = db.ref('users/').child(userId);
    return userRef.once('value').then(function(snapshot) {
        // first promise succeeded, save snapshot
        return snapshot.val();
    });
};

async function getUserLanguageSetting(userId) {
    // retVal = w/o "await" >> returns a promise; w/ "await" >> returns the obj
    var userDetails = await getUserData(userId);
    console.log("\nin lang setting: ");
    console.log(userDetails);

    return userDetails.language;
};

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(userSnapshot) {
        var details = userSnapshot.val();
        details.userId = userSnapshot.key;

        returnArr.push(details);
    });
    return returnArr;
};

module.exports = (cmd, userId, language) => {
    if (cmd === "set") {
        writeUserData(userId, language);
    } else if (cmd === "get") {
        var langSet;
        var getLanguage = getUserLanguageSetting(userId);
        Promise.all([getLanguage]).then(function(results) {
            console.log(results[0]);
            langSet = results[0];
        });
        console.log("\nbefore return");
        console.log(langSet);
        return langSet;
    }
};