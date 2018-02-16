module.exports = (result) => {
    switch(result.parameters.Languages) {
        case "German":
            return "Okay, let's practice German!";
        case "English":
            return "English it is!";
        case "Japanese": 
            return "Konnichiwa!";
        default:
            // respond with "sorry" if some other language given
            if (result.resolvedQuery === "French")
                return "Sorry, we can only chat in one of the following options: German, English or Japanese";
            }
            return "";
    }
};