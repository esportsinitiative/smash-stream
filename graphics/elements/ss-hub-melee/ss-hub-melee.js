(function () {
	'use strict';

	const hubTitle = nodecg.Replicant('hubTitle');
	const hubCommentatorLeft = nodecg.Replicant('hubCommentatorLeft');
	const hubCommentatorRight = nodecg.Replicant('hubCommentatorRight');
	const playerLeft = nodecg.Replicant('player1');
	const playerRight = nodecg.Replicant('player2');
	const playerVisible = nodecg.Replicant('playerVisible');
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
			this.tl = new TimelineLite({autoRemoveChildren: true});

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

			playerLeft.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.playerLeft = BLANK_ELEMENT;
				} else {
					this.playerLeft = {};
					this.playerLeft = newVal;
				}

				if (!this._playerLeftReady) {
					this._playerLeftReady = true;
					this._checkReplicantsReady();
				}
			});

			playerRight.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.playerRight = BLANK_ELEMENT;
				} else {
					this.playerRight = {};
					this.playerRight = newVal;
				}

				if (!this._playerRightReady) {
					this._playerRightReady = true;
					this._checkReplicantsReady();
				}
			});
		},

		// Only declare the "visible" replicants once all the other replicants are ready.
		_checkReplicantsReady() {
			if (this._hubTitleReady && this._hubCommentatorLeftReady && this._hubCommentatorRightReady && this._playerLeftReady && this._playerRightReady) {
				console.log('all replicants ready, adding change handlers for couchVisible and playerVisible');
				hubShowUpdate.on('change', this.hubShowUpdatesChange.bind(this));
				playerVisible.on('change', this.playersVisibleChanged.bind(this));
			}
		},

		playersVisibleChanged(newVal) {
			if (newVal) {
				this.tl.add('playersEnter');

				if (this.playerLeft) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#player-left .name'), this.playerLeft.current, MAX_PLAYER_NAME_WIDTH);
					}, null, null, 'playersEnter');

					this.tl.to('#player-left', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'playersEnter');
				}

				if (this.playerRight) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#player-right .name'), this.playerRight.current, MAX_PLAYER_NAME_WIDTH);
					}, null, null, 'playersEnter');

					this.tl.to('#player-right', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'playersEnter');
				}
			} else {
				this.tl.add('playersExit');

				this.tl.to([
					'#player-left'
				], 0.5, {
					opacity: 0,
					x: -25,
					ease: Power2.easeIn
				}, 'playersExit');

				this.tl.to([
					'#player-right'
				], 0.5, {
					opacity: 0,
					x: 25,
					ease: Power2.easeIn
				}, 'playersExit');
			}
		},

		hubShowUpdatesChange(newVal) {
			if (this.hubTitle) {
				this.setAndFitText(this.$$('#hub-title span'), this.hubTitle.current);
			}
			if (this.hubCommentatorLeft) {
				this.setAndFitText(this.$$('#commentator-left .name'), this.hubCommentatorLeft.current);
			}
			if (this.hubCommentatorRight) {
				this.setAndFitText(this.$$('#commentator-right .name'), this.hubCommentatorRight.current);
			}
		},

		setAndFitText(node, newString) {
			node.innerText = newString;
		},

		setAndFitText(node, newString, maxWidth) {
			node.innerText = newString;
			const clientWidth = node.scrollWidth;
			if (clientWidth > maxWidth) {
				TweenLite.set(node, {
					scaleX: maxWidth / clientWidth
				});
			} else {
				TweenLite.set(node, {
					scaleX: 1
				});
			}
		}
	});
})();
