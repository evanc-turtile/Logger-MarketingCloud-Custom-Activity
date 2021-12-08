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

	function initialize(data) {
		if (data) {
			payload = data;
		}
	}

	function save() {
		connection.trigger('requestSchema');
		payload['arguments'] = payload['arguments'] || {};
		payload['arguments'].execute = payload['arguments'].execute || {};

		payload['arguments'].execute.inArguments = [{
		}];

		payload['metaData'] = payload['metaData'] || {};
		payload['metaData'].isConfigured = true;

		console.log(JSON.stringify(payload));

		connection.trigger('updateActivity', payload);

		connection.trigger('nextStep');
	}
});