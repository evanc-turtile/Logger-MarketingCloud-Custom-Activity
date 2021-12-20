define(['postmonger'], function(Postmonger) {
	'use strict';
	//var Postmonger = require('postmonger');
	var connection = new Postmonger.Session();
	var payload = {};
	var steps = [
		{'key': 'step1', 'label': 'Step 1'}
	];

	$(window).ready(function () {
		connection.trigger('ready');
	});

    connection.on('clickedNext', save);
    connection.on('requestedSchema', function(data) {
    	console.log('*** Schema ***', JSON.stringify(data['schema']));
    });

    connection.on('initActivity', function(data) {
    	console.log(data);
    	initialize(data);
    });

    connection.on('requestedEndpoints', function(endpoints) {
    	console.log(endpoints);
    	connection.trigger('requestInteractionDefaults');
    })

    connection.on('requestedInteractionDefaults', function(settings) {
    	console.log(settings);
    	connection.trigger('requestTriggerEventDefinition');
    });

    connection.on('requestedTriggerEventDefinition', function(eventDefinitionModel) {
    	console.log(eventDefinitionModel);
    	connection.trigger('requestInteraction');
    });

    connection.on('requestedInteraction', function(interaction) {
    	console.log(interaction);
    });

	function initialize(data) {
		if (data) {
			payload = data;
		}
		document.getElementById('testArea').value = JSON.stringify(data, null, 2);

		var inArgs = payload["arguments"].execute.inArguments;

		for(var i = 0; i < inArgs.length; i++) {
			var inArg = inArgs[i];
			console.log(inArg);
			// there should only be one key saved per inArgument... (and this inArg key is based on the name of the field)
			var inArgKey = Object.keys(inArg)[0];
			//var inArgKey = inArgKeys[0];

			if(document.getElementById(inArgKey)) document.getElementById(inArgKey).value = inArgs[i][inArgKey];
		}
		//var inputEls = document.getElementsByTagName('input');
	}

	function save() {
		// first, clear any inArguments that was saved previously...
		payload['arguments'].execute.inArguments = [];

		// next, save each input field as an inArgument in the inArguments arr
		var inputEls = document.getElementsByTagName('input');
		// insert one argument into inArguments at a time
		for(var i = 0; i < inputEls.length; i++) {
			var inArg = {};
			inArg[inputEls[i].id] = inputEls[i].value;
			payload['arguments'].execute.inArguments.push(inArg)
		}
		payload["metaData"].isConfigured = true;
		//var configuration = JSON.parse( document.getElementById('testArea').value );

		console.log(payload);
		var configuration = payload;

		connection.trigger('updateActivity', configuration);
	}

	connection.trigger('requestSchema');

	connection.trigger('requestInteractionDefaults');
});

var sendRequest = function() {
	let request = new XMLHttpRequest();
	request.open('POST', 'https://sfmcloggerwebapp.herokuapp.com/sendJson');
	request.send({"someTest":"abc"});
	request.onload = () => {
		console.log(request);
		if(request.status === 200 || request.status === 201) {
			console.log("It works!");
		} else {
			console.log(`error ${request.status} ${request.statusText}`);
		}
	};
};