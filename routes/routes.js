/****************************************************************************************************************
 * File: routes.js																								*
 * 																												*
 * Desc: JS file that contains all of the necessary GET and POST calls.											*
 * 
 * *************************************************************************************************************/

const routes = require('express').Router();
const https = require('https');
var fs = require('fs');
var configObj = JSON.parse(fs.readFileSync('./public/config.json', 'utf8'));

// GET request to index.html
routes.get('/', function(req, res, next) {
	res.writeHead(200);
	res.sendfile('index.html');
});

// GET request to config.json - used for Journey Builder to load configurations when using Custom Activity.
routes.get('/config.json', function(req, res, next) {
	res.status(200).json(configObj);
});

routes.post('/execute', function(req, res, next) {
	validateConfigurations(req.body);
	//res.status(200).json({});
	res.send(201, {"hasExecuted":true});

});

routes.post('/save', function(req, res, next) {
	validateConfigurations(req);
	//res.status(200).json({});
	res.send(200, 'Save')
});

routes.post('/validate', function(req, res, next) {
	validateConfigurations(req.body);
	//res.status(200).json({});
	res.send(200, 'Validate');
});

routes.post('/stop', function(req, res, next) {
	validateConfigurations(req.body);
	//res.status(200).json({});
	res.send(200, 'Stop');
});

routes.post('/publish', function(req, res, next) {
	validateConfigurations(req.body);
	//res.status(200).json({});
	res.send(200, 'Publish');
});

var validateConfigurations = function(requestPayload) {
	const options = {
	  hostname: "en118ofahjdyi.x.pipedream.net",
	  port:443,
	  path: "/",
	  method: "POST"
	}

	const req = https.request(options)
	req.write(JSON.stringify(requestPayload));
	req.end();
};

module.exports = routes;