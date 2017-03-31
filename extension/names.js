/* eslint-disable object-property-newline */
'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('player1', {defaultValue: {name: '', info: ''}});
	nodecg.Replicant('player2', {defaultValue: {name: '', info: ''}});

	nodecg.Replicant('names-playerVisible', {defaultValue: false});
};
