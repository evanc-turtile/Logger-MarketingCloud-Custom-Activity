var express = require('express');
var bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

var app = express();
app.use(express.static('public'));
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', routes);

// GET request to web application, will always load up the web application
app.get('/', function(req, res) {
	res.sendStatus(200);

});

app.listen(port, () => {
	console.log(`Listening on port #${port}`);
})