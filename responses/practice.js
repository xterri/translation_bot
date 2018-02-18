/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/

module.exports = (response, userId) => {
    var languageParam = response.result.parameters.Languages;

    // save user's data and check which language they want to translate to
    switch(languageParam.toLowerCase()) {
        case "german":
            return "Okay, let's practice German!";
        case "english":
            return "English it is!";
        case "japanese": 
            return "Konnichiwa!";
        default:
            // respond with "sorry" if some other language given
            return "";
    }
};