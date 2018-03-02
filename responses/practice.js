/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/
const saveToDatabase = require('../helpers/saveData');

async function getUserLanguageResult(userId) {
    let getResult = await saveToDatabase("get", userId);

    console.log(getResult);
    return getResult;
    // Promise.all([getPromise]).then(function(results) {
    //     console.log("in practice.js: " + results[0]);
    //     return results[0];
    // });
};

module.exports = (response, userId) => {
    var getPromise;
    var check;
    var languageParam = response.result.parameters.Languages.toLowerCase();

    getUserLanguageResult(userId).then(function(result) {
        console.log("results: ", result);
        check = Promise.all([result]).then(function(results) {
            console.log("in practice.js: " + results[0]);
            return results[0];
        }).then(function(thing) {
            console.log("thing: ", thing);
        });
    });
    //return result
    //console.log("before languageSet: " + result);

    //}).then(function(check) {
        //console.log("then thing, language?");
        //console.log(check);

        if (languageParam) { 
            saveToDatabase("set", userId, languageParam);
        } //else {
        //     languageParam += "language set?"
        // }
    //});

    // save user's data and check which language they want to translate to
    switch(languageParam) {
        case "german":
            return "Okay, let's practice German!";
        case "english":
            return "English it is!";
        case "japanese":
            return "Konnichiwa!";
        case "language set?":
            return "Yo bitch this works now! GG";
        default:
            // respond with "sorry" if some other language given
            return response.result.fulfillment.speech;
    }
};