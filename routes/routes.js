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
//var icon = fs.readFileSync('./public/images/icon.png', 'utf8');

// GET request to index.html
routes.get('/', function(req, res, next) {
	res.writeHead(200);
	res.sendfile('index.html');
});

// GET request to config.json - used for Journey Builder to load configurations when using Custom Activity.
routes.get('/config.json', function(req, res, next) {
	res.status(200).json(configObj);
});

routes.get('/images/icon.png', function(req, res, next) {
	//res.status(200).
	fs.readFile('./public/images/icon.png', function(err, data) {
		res.send(200, data);
	});
	// fails otherwise
	res.send(400, icon);
});

routes.post('/execute', function(req, res, next) {
	validateConfigurations(req.body, "/execute");
	//res.status(200).json({});
	res.status(201).json({"someExtraId":123});

});

routes.post('/save', function(req, res, next) {
	validateConfigurations(req.body, "/save");
	//res.status(200).json({});
	res.status(200).json({'activity':'Save'});
});

routes.post('/validate', function(req, res, next) {
	validateConfigurations(req.body, "/validate");
	//res.status(200).json({});
	res.status(200).json({'activity':'Validate'});
});

routes.post('/stop', function(req, res, next) {
	validateConfigurations(req.body, "/stop");
	//res.status(200).json({});
	res.status(200).json({'activity':'Stop'});
});

routes.post('/publish', function(req, res, next) {
	validateConfigurations(req.body, "/publish");
	//res.status(200).json({});
	res.status(200).json({'activity':'Publish'});
});

routes.post('/sendJson', function(req, res, next) {
	validateConfigurations(req.body, "/sendJson");
	res.status(200);
})

var validateConfigurations = function(requestPayload, pathEndpoint) {
	const options = {
	  hostname: "en118ofahjdyi.x.pipedream.net",
	  port:443,
	  path: pathEndpoint,
	  method: "POST"
	}

	const req = https.request(options)
	req.write(JSON.stringify(requestPayload));
	req.end();
};

module.exports = routes;