const apiAiClient = require('apiai')(process.env.API_ACCESS_TOKEN);
const sendTextMessage = require('./sendTextMessage');

module.exports = (event) => {
	if (!event.message.is_echo) {
		const senderId = event.sender.id;
		const message = event.message.text;
		const apiaiSession = apiAiClient.textRequest(message, {sessionId: senderId});
		
		apiaiSession.on('response', (response) => {
			var result = response.result.fulfillment.speech;

			switch(response.result.action) {
				case "purpose":
					result += " No effing clue what to include here.";
					break ;
				case "practice":
					result += " Really need to move out.";
					break ;
				default:
					result += " This is part of the default.";
					break ;
			}
			// use google translate api to translate the text (not most reliable to just translate) 
				// add in postback option for translation
			// will need a "check" to see if foreign conversation is selected
			sendTextMessage(senderId, result);
		});
		
		apiaiSession.on('error', error => console.log(error));
		apiaiSession.end();
	}
};
