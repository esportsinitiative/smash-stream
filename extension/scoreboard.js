/* eslint-disable object-property-newline */
'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('scoreboardShowing', {defaultValue: false});
	nodecg.Replicant('scores', {
		defaultValue: {
			right: {
				score: 0,
				tag: 'RIGHT'
			},
			left: {
				score: 0,
				tag: 'LEFT'
			}
		}
	});
};
