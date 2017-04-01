'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('scores', {
		defaultValue: {
			red: {
				score: 0,
				tag: 'RED'
			},
			blu: {
				score: 0,
				tag: 'BLU'
			}
		}
	});

	nodecg.Replicant('showHashtag', {defaultValue: true});

	try {
		require('./lowerthird')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load lowerthird lib:', e.stack);
		process.exit(1);
	}

	try {
		require('./twitter')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "twitter" lib:', e.stack);
		process.exit(1);
	}

	try {
		require('./countdown')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "countdown" lib:', e.stack);
		process.exit(1);
	}

	try {
		require('./match-info')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "match-info" lib:', e.stack);
		process.exit(1);
	}

	try {
		require('./hub')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "match-info" lib:', e.stack);
		process.exit(1);
	}
};
