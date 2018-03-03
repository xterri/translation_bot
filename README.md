# TransBot
A first attempt at building a translation/conversation bot using the Facebook Messenger Platform and Dialogflow.

The aim is to have users select a language and the bot will respond by translating a set dialogue from Dialogflow using the Google Translate / Cloud Translation API. Allowing users to practice reading and **writing** in their chosen language, hopefully strengthening their language learning ability. 

Ideally, I would like to make the bot converse more naturally, smoothly, and be more engaging with the users.

### Demo
The bot is currently hosted on its own Facebook page, [TranBot](https://www.facebook.com/TranBot-193371054589842/). However, it is still in development mode and not publicly available.

## Built With
* Node.js & Express
* Heroku
* Firebase

## Future Updates / To Do List
The bot is still in its development phases and still require a lot of work to make it ideal. This section will be mostly tracking the list of things I have left to do on it.

* Allow users to "opt-out" of the foreign conversation (reset their language choice in the db)
* Add in postback options (buttons to make it more user friendly)
* Apply a Translation API to the bot
* Edit Dialogflow's "action" so it does not stick to the same action until a response is received
* Try and make the dialogue flow more smoothly
* Apply a key or specific prompt to initialize the practice
