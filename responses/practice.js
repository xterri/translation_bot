/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/

module.exports = (response, userId) => {
    console.log(">>in practice.js<<");
    var languageParam = response.result.parameters.Language;

    console.log(languageParam);
    // save user's data and check which language they want to translate to
    switch(languageParam) {
        case "German":
            return "Okay, let's practice German!";
        case "English":
            return "English it is!";
        case "Japanese": 
            return "Konnichiwa!";
        default:
            // respond with "sorry" if some other language given
            return "";
    }
};