/* eslint-disable object-property-newline */
'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('matchTitle', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('matchFormat', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('player1', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('player2', {defaultValue: {next: '', current: ''}});

	nodecg.Replicant('matchInfoVisible', {defaultValue: false});
	nodecg.Replicant('playerVisible', {defaultValue: false});
};
