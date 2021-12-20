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
	}

	function save() {
		/*connection.trigger('requestSchema');
		payload['arguments'] = payload['arguments'] || {};
		payload['arguments'].execute = payload['arguments'].execute || {};

		payload['arguments'].execute.inArguments = [{
		}];

		payload['metaData'] = payload['metaData'] || {};
		payload['metaData'].isConfigured = true;*/

		var configuration = JSON.parse( document.getElementById('testArea').value );

		console.log(payload);

		//connection.trigger('requestEndpoints');

		//connection.trigger('updateActivity', payload);

		//connection.trigger('nextStep');

		connection.trigger('updateActivity', configuration);
	}

	connection.trigger('requestSchema');

	connection.trigger('requestInteractionDefaults');
});

var sendRequest = function() {
	let request = new XMLHttpRequest();
	request.open('POST', '');
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