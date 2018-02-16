/*
** ProcessMessage will return responses directly to the FB client/user
** Testing this in Dialogflow / API.ai will not get these responses
**
** ISSUES: 
** 	With only one custom defined intent, there was a lag in response time
** 	and default intents' actions were labeled as the one custom intent
*/
const apiAiClient = require('apiai')(process.env.API_ACCESS_TOKEN);
const sendTextMessage = require('./sendTextMessage');
const practiceResponse = require('../responses/practice');

module.exports = (event) => {
	if (!event.message.is_echo) {
		const senderId = event.sender.id;
		const message = event.message.text;
		const apiaiSession = apiAiClient.textRequest(message, {sessionId: senderId});
		
		console.log(message);
		apiaiSession.on('response', (response) => {
			// retrieving the api's actual response
			var result = response.result.fulfillment.speech;

			console.log(response.result.action);
			// adding onto / changing the api's response
			switch(response.result.action) {
				case "practice":
					// respond with "sorry" if some other language given (?)
					result += practiceResponse(response, senderId);
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
