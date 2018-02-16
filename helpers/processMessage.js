const apiAiClient = require('apiai')(process.env.API_ACCESS_TOKEN);
const sendTextMessage = require('./sendTextMessage');

module.exports = (event) => {
	if (!event.message.is_echo) {
		const senderId = event.sender.id;
		const message = event.message.text;
		const apiaiSession = apiAiClient.textRequest(message, {sessionId: senderId});
		
		apiaiSession.on('response', (response) => {
			const result = "";
			if (response.result.action === "practice") {
				result += "Coolio, let's practice that";
			} else if (response.result.action === "input.unknown") {
				result += "terri testing this"; 
			} else {
				result += response.result.fulfillment.speech;
			}
			console.log(result);
			// use google translate api to translate the text (not most reliable to just translate) 
				// add in postback option for translation
			// will need a "check" to see if foreign conversation is selected
			sendTextMessage(senderId, result);
		});
		
		apiaiSession.on('error', error => console.log(error));
		apiaiSession.end();
	}
};
