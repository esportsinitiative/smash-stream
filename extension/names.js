/* eslint-disable object-property-newline */
'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('gameTitle', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('gameType', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('player1', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('player2', {defaultValue: {next: '', current: ''}});

	nodecg.Replicant('gameInfoVisible', {defaultValue: false});
	nodecg.Replicant('playerVisible', {defaultValue: false});
};
