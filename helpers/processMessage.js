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
		
		apiaiSession.on('response', (response) => {
			// retrieving the api's actual response
			var result = "";

			// adding onto / changing the api's response
			switch(response.result.action) {
				case "practice":
					// respond with "sorry" if some other language given (?)
					practiceResponse(response, senderId).then(function(value) {
						sendTextMessage(senderId, value);
					});
					break ;
				default:
					result += response.result.fulfillment.speech;
					sendTextMessage(senderId, result);
					//check if user has an account in db and if practice is init
					break ;
			}
			// use google translate api to translate the text (not most reliable to just translate) 
				// add in postback option for translation
		});
		
		apiaiSession.on('error', error => console.log(error));
		apiaiSession.end();
	}
};
