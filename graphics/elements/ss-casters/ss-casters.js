(function () {
	'use strict';

	const hubCommentatorLeft = nodecg.Replicant('hubCommentatorLeft');
	const hubCommentatorRight = nodecg.Replicant('hubCommentatorRight');
	const hubShowUpdate = nodecg.Replicant('hubShowUpdate');

	/* Pixels */
	const MAX_PLAYER_NAME_WIDTH = 240;
	const MAX_HEADER_WIDTH = 316;

	Polymer({
		is: 'ss-casters',

		ready() {
			hubCommentatorLeft.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.hubCommentatorLeft = null;
				} else {
					this.hubCommentatorLeft = {};
					this.hubCommentatorLeft = newVal;
				}

				if (!this._hubCommentatorLeftReady) {
					this._hubCommentatorLeftReady = true;
					this._checkReplicantsReady();
				}
			});

			hubCommentatorRight.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.hubCommentatorRight = null;
				} else {
					this.hubCommentatorRight = {};
					this.hubCommentatorRight = newVal;
				}

				if (!this._hubCommentatorRightReady) {
					this._hubCommentatorRightReady = true;
					this._checkReplicantsReady();
				}
			});
		},

		// Only declare the "visible" replicants once all the other replicants are ready.
		_checkReplicantsReady() {
			if (this._hubCommentatorLeftReady && this._hubCommentatorRightReady) {
				console.log('all replicants ready, adding change handlers for couchVisible and playerVisible');
				hubShowUpdate.on('change', this.hubShowUpdatesChange.bind(this));

			}
		},

		hubShowUpdatesChange(newVal) {
			if (this.hubCommentatorLeft) {
				this.setAndFitText(this.$$('#commentator-left .name'), this.hubCommentatorLeft.current, MAX_HEADER_WIDTH);
			}
			if (this.hubCommentatorRight) {
				this.setAndFitText(this.$$('#commentator-right .name'), this.hubCommentatorRight.current, MAX_HEADER_WIDTH);
			}
		},

		setAndFitText(node, newString, maxWidth) {
			node.innerText = newString;
		}
	});
})();
