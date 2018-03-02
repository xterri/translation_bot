/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/
const saveToDatabase = require('../helpers/saveData');

// async always returns a promise, so must handle it in function that calls it
async function getUserLanguageResult(userId) {
    let getResult = await saveToDatabase("get", userId);

    return getResult;
};

module.exports = (response, userId) => {
    var languageParam = response.result.parameters.Languages.toLowerCase();

    // goes to async function >> "result" / promise = passed into then()'s function param
    getUserLanguageResult(userId).then(function(result) {
        // extract/get promise results/values and return them
        return Promise.all([result]).then(function(results) {
            return results[0];
        });
        // "language" = return value from '.then(function(result))
    }).then(function(language) {
        // anything to be done with the results must be done in here
            // cannot pass outside the promise, else it will be the last thing done
        if (language) {
            return "Language Set to " + language;
        } else if (languageParam) { 
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
    });
};