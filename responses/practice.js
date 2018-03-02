/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/
const saveToDatabase = require('../helpers/saveData');

async function getUserLanguageResult(userId) {
    let getResult = await saveToDatabase("get", userId);

    return getResult;
    // Promise.all([getPromise]).then(function(results) {
    //     console.log("in practice.js: " + results[0]);
    //     return results[0];
    // });
};

module.exports = (response, userId) => {
    var languageParam = response.result.parameters.Languages.toLowerCase();

    getUserLanguageResult(userId).then(function(result) {        
        return Promise.all([result]).then(function(results) {
            return results[0];
        });
    }).then(function(thing) {
      console.log("thing: ", thing); 
      if (thing)
        console.log("\nsomething");
    });

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