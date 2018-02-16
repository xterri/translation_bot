module.exports = (languageParam) => {
    switch(languageParam) {
        case "German":
            return "Okay, let's practice German!";
        case "English":
            return "English it is!";
        case "Japanese": 
            return "Konnichiwa!";
        default:
            return "";
    }
};