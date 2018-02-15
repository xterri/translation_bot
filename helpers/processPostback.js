const request = require('request');
const sendTextMessage = require('./sendTextMessage');

module.exports = (event) => {
	const senderId = event.sender.id;
	const payload = event.postback.payload;

	if (payload === "Greeting") {
		request({
			url: "https://graph.facebook.com/v2.6/" + senderId,
			qs: {
				access_token: process.env.PAGE_ACCESS_TOKEN,
				fields: "first_name, locale"
			},
			method: "GET"
		}, function(error, response, body) {
			var greeting = "";
			if (error) {
				console.log("Error getting user's name: " + error);
			} else {
				//var bodyObj = JSON.parse(body);
				var name = body.first_name;

				greeting = "Hi " + name + "! ";
			}
			var message = greeting + "I am Translation/Convesation Bot in development."
			sendTextMessage(senderId, message);
		});
	}
};
