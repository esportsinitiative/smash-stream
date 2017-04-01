(function () {
	'use strict';

	const hubTitle = nodecg.Replicant('hubTitle');
	const hubCommentatorLeft = nodecg.Replicant('hubCommentatorLeft');
	const hubCommentatorRight = nodecg.Replicant('hubCommentatorRight');
	const hubPlayerLeft = nodecg.Replicant('hubPlayerLeft');
	const hubPlayerRight = nodecg.Replicant('hubPlayerRight');
	const hubShowUpdate = nodecg.Replicant('hubShowUpdate');

	/* Pixels */
	const MAX_PLAYER_NAME_WIDTH = 240;
	const MAX_HEADER_WIDTH = 316;
	const BLANK_ELEMENT = {
		next: '',
		current: ''
	}

	Polymer({
		is: 'ss-hub-melee',

		ready() {
			// this.tl = new TimelineLite({
			// 	autoRemoveChildren: true
			// });

			hubTitle.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.hubTitle = BLANK_ELEMENT;
				} else {
					this.hubTitle = {};
					this.hubTitle = newVal;
				}

				if (!this._hubTitleReady) {
					this._hubTitleReady = true;
					this._checkReplicantsReady();
				}
			});

			hubCommentatorLeft.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.hubCommentatorLeft = BLANK_ELEMENT;
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
					this.hubCommentatorRight = BLANK_ELEMENT;
				} else {
					this.hubCommentatorRight = {};
					this.hubCommentatorRight = newVal;
				}

				if (!this._hubCommentatorRightReady) {
					this._hubCommentatorRightReady = true;
					this._checkReplicantsReady();
				}
			});

			hubPlayerLeft.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.hubPlayerLeft = BLANK_ELEMENT;
				} else {
					this.hubPlayerLeft = {};
					this.hubPlayerLeft = newVal;
				}

				if (!this._hubPlayerLeftReady) {
					this._hubPlayerLeftReady = true;
					this._checkReplicantsReady();
				}
			});

			hubPlayerRight.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.hubPlayerRight = BLANK_ELEMENT;
				} else {
					this.hubPlayerRight = {};
					this.hubPlayerRight = newVal;
				}

				if (!this._hubPlayerRightReady) {
					this._hubPlayerRightReady = true;
					this._checkReplicantsReady();
				}
			});
		},

		// Only declare the "visible" replicants once all the other replicants are ready.
		_checkReplicantsReady() {
			if (this._hubTitleReady && this._hubCommentatorLeftReady && this._hubCommentatorRightReady && this._hubPlayerLeftReady && this._hubPlayerRightReady) {
				console.log('all replicants ready, adding change handlers for couchVisible and playerVisible');
				hubShowUpdate.on('change', this.hubShowUpdatesChange.bind(this));

			}
		},

		hubShowUpdatesChange(newVal) {
			if (this.hubTitle) {
				this.setAndFitText(this.$$('#hub-title span'), this.hubTitle.current, MAX_HEADER_WIDTH);
			}
			if (this.hubCommentatorLeft) {
				this.setAndFitText(this.$$('#commentator-left .name'), this.hubCommentatorLeft.current, MAX_HEADER_WIDTH);
			}
			if (this.hubCommentatorRight) {
				this.setAndFitText(this.$$('#commentator-right .name'), this.hubCommentatorRight.current, MAX_HEADER_WIDTH);
			}
			if (this.hubPlayerLeft) {
				this.setAndFitText(this.$$('#hub-player-left .name'), this.hubPlayerLeft.current, MAX_HEADER_WIDTH);
			}
			if (this.hubPlayerRight) {
				this.setAndFitText(this.$$('#hub-player-right .name'), this.hubPlayerRight.current, MAX_HEADER_WIDTH);
			}
		},

		setAndFitText(node, newString, maxWidth) {
			node.innerText = newString;
			// const clientWidth = node.scrollWidth;
			// if (clientWidth > maxWidth) {
			// 	TweenLite.set(node, {
			// 		scaleX: maxWidth / clientWidth
			// 	});
			// } else {
			// 	TweenLite.set(node, {
			// 		scaleX: 1
			// 	});
			// }
		}
	});
})();
