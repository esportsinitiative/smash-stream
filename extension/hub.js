/* eslint-disable object-property-newline */
'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	nodecg.Replicant('hubTitle', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('hubCommentatorLeft', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('hubCommentatorRight', {defaultValue: {next: '', current: ''}});
	nodecg.Replicant('hubShowUpdate', {defaultValue: false})
};
