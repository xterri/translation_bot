const apiAiClient = require('apiai')(process.env.API_ACCESS_TOKEN);
const sendTextMessage = require('./sendTextMessage');

module.exports = (event) => {
	if (!event.message.is_echo) {
		const senderId = event.sender.id;
		const message = event.message.text;
		const apiaiSession = apiAiClient.textRequest(message, {sessionId: senderId});
		
		apiaiSession.on('response', (response) => {
			const result = response.result.fulfillment.speech;
			sendTextMessage(senderId, result);
		});
		
		apiaiSession.on('error', error => console.log(error));
		apiaiSession.end();
	}
};
