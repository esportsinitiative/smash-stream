'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('showHashtag', {defaultValue: true});

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

	try {
		require('./scoreboard')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "match-info" lib:', e.stack);
		process.exit(1);
	}
};
