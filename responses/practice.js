/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/
const accessToDatabase = require('../helpers/saveData');

function setLanguage(userId, language) {
    accessToDatabase("set", userId, language);
    // save user's data and check which language they want to translate to
    switch (languageParam) {
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

module.exports = (response, userId) => {
    var languageParam = response.result.parameters.Languages.toLowerCase();

    // goes to async function >> "result" / promise = passed into then()'s function param
    return accessToDatabase("get", userId).then(function(result) {
        return result;
        // "language" = return value from '.then(function(result))
    }).then(function(language) {
        if (languageParam) { 
            return setLanguage(userId, languageParam);
        }
        // anything to be done with the results must be done in here
            // cannot pass outside the promise, else it will be the last thing done
        return "Language Set to " + language;
    }).catch(function(err) {
        return setLanguage(userId, languageParam);
    });
};