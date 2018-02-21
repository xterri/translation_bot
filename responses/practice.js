/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/
const saveToDatabase = require('../helpers/saveData');

module.exports = (response, userId) => {
    var languageParam = response.result.parameters.Languages.toLowerCase();
    var languageSet;
    console.log("check if langParam is set: " + languageParam);
    
    if (languageParam) { 
        saveToDatabase("set", userId, languageParam);
    } else {
        languageSet = saveToDatabase("get", userId, languageParam);
        console.log(languageSet);
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