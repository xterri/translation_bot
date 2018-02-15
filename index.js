const express = require('express');
const bodyParser = require('body-parser');

//const verificationController = require('./controllers/verification');
//const webhookController = require('./controllers/webhook');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => console.log("Server listening on port " + app.get('port')));

app.get('/', function(req, res) {
	res.sendFile('views/main.html', { root: __dirname });
});

//app.get('/webhook', verificationController);
//app.post('/webhook', webhookController);
