/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/
const saveToDatabase = require('../helpers/saveData');

function getUserLanguageResult(userId) {
    let getResult = saveToDatabase("get", userId);

    console.log("getResult: ", getResult);
    return getResult;
    // Promise.all([getPromise]).then(function(results) {
    //     console.log("in practice.js: " + results[0]);
    //     return results[0];
    // });
};

module.exports = (response, userId) => {
    var check;
    var result;
    var languageParam = response.result.parameters.Languages.toLowerCase();

    result = getUserLanguageResult(userId);
    
    check = function(result) {
        // getUserLanguageResult(userId).then(function(result) {
        console.log("results: ", result);
        check = Promise.all([result]).then(function(results) {
            console.log("in practice.js: " + results[0]);
            return results[0];
        }).then(function(thing) {
            console.log("thing: ", thing);
        });
    };

    if (languageParam) { 
        saveToDatabase("set", userId, languageParam);
    }

    // save user's data and check which language they want to translate to
    switch(languageParam) {
        case "german":
            return "Okay, let's practice German!";
        case "english":
            return "English it is!";
        case "japanese":
            return "Konnichiwa!";
        default:
            // respond with "sorry" if some other language given
            return response.result.fulfillment.speech;
    }
};