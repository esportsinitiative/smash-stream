(function () {
	'use strict';

	const player1 = nodecg.Replicant('player1');
	const player2 = nodecg.Replicant('player2');
	// const player3 = nodecg.Replicant('player3');
	// const player4 = nodecg.Replicant('player4');
	const playerVisible = nodecg.Replicant('names-playerVisible');

	// const INTERVAL = 10;
	// const onNow = nodecg.Replicant('onNow');
	// const upNext = nodecg.Replicant('upNext');

	/* Pixels */
	const MAX_PLAYER_NAME_WIDTH = 240;

	Polymer({
		is: 'ss-melee',

		ready() {
			this.tl = new TimelineLite({autoRemoveChildren: true});
			// this.tl.set(this.$.content, {y: '100%'});
			// this.$.content.innerHTML = "hello";

			player1.on('change', newVal => {
				if (!newVal.name.trim() && !newVal.info.trim()) {
					this.player1 = null;
				} else {
					this.player1 = {};
					this.player1 = newVal;
				}

				if (!this._player1Ready) {
					this._player1Ready = true;
					this._checkReplicantsReady();
				}
			});

			player2.on('change', newVal => {
				if (!newVal.name.trim() && !newVal.info.trim()) {
					this.player2 = null;
				} else {
					this.player2 = {};
					this.player2 = newVal;
				}

				if (!this._player2Ready) {
					this._player2Ready = true;
					this._checkReplicantsReady();
				}
			});

			// player3.on('change', newVal => {
			// 	if (!newVal.name.trim() && !newVal.info.trim()) {
			// 		this.player3 = null;
			// 	} else {
			// 		this.player3 = {};
			// 		this.player3 = newVal;
			// 	}

			// 	if (!this._player3Ready) {
			// 		this._player3Ready = true;
			// 		this._checkReplicantsReady();
			// 	}
			// });

			// player4.on('change', newVal => {
			// 	if (!newVal.name.trim() && !newVal.info.trim()) {
			// 		this.player4 = null;
			// 	} else {
			// 		this.player4 = {};
			// 		this.player4 = newVal;
			// 	}

			// 	if (!this._player4Ready) {
			// 		this._player4Ready = true;
			// 		this._checkReplicantsReady();
			// 	}
			// });
		},

		// Only declare the "visible" replicants once all the other replicants are ready.
		_checkReplicantsReady() {
			if (this._player1Ready && this._player2Ready) { // && this._player3Ready && this._player4Ready) {
				console.log('all replicants ready, adding change handlers for couchVisible and playerVisible');
				playerVisible.on('change', this.playersVisibleChanged.bind(this));
			}
		},

		playersVisibleChanged(newVal) {
			if (newVal) {
				this.tl.add('playersEnter');

				if (this.player1) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#player-name-left .player-name'), this.player1.name, MAX_PLAYER_NAME_WIDTH);
						// this.setAndFitText(this.$$('#player-name-left .info-content'), this.player1.info, MAX_PLAYER_INFO_WIDTH);
					}, null, null, 'playersEnter');

					this.tl.to('#player-name-left', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'playersEnter');
				}

				if (this.player2) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#player-name-right .player-name'), this.player2.name, MAX_PLAYER_NAME_WIDTH);
						// this.setAndFitText(this.$$('#player-name-right .info-content'), this.player2.info, MAX_PLAYER_INFO_WIDTH);
					}, null, null, 'playersEnter');

					this.tl.to('#player-name-right', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'playersEnter');
				}

				// if (this.player3) {
				// 	this.tl.call(() => {
				// 		this.setAndFitText(this.$$('#player3 .player-name'), this.player3.name, MAX_PLAYER_NAME_WIDTH);
				// 		// this.setAndFitText(this.$$('#player3 .info-content'), this.player3.info, MAX_PLAYER_INFO_WIDTH);
				// 	}, null, null, 'playersEnter');

				// 	this.tl.to('#player3', 0.5, {
				// 		opacity: 1,
				// 		x: 0,
				// 		ease: Power2.easeOut
				// 	}, 'playersEnter');
				// }

				// if (this.player4) {
				// 	this.tl.call(() => {
				// 		this.setAndFitText(this.$$('#player4 .player-name'), this.player4.name, MAX_PLAYER_NAME_WIDTH);
				// 		// this.setAndFitText(this.$$('#player4 .info-content'), this.player4.info, MAX_PLAYER_INFO_WIDTH);
				// 	}, null, null, 'playersEnter');

				// 	this.tl.to('#player4', 0.5, {
				// 		opacity: 1,
				// 		x: 0,
				// 		ease: Power2.easeOut
				// 	}, 'playersEnter');
				// }
			} else {
				this.tl.add('playersExit');

				this.tl.to([
					'#player-name-left'
					// '#player3'
				], 0.5, {
					opacity: 0,
					x: -25,
					ease: Power2.easeIn
				}, 'playersExit');

				this.tl.to([
					'#player-name-right'
					// '#player4'
				], 0.5, {
					opacity: 0,
					x: 25,
					ease: Power2.easeIn
				}, 'playersExit');
			}
		},

		setAndFitText(node, newString, maxWidth) {
			node.innerText = newString;
			const clientWidth = node.scrollWidth;
			if (clientWidth > maxWidth) {
				TweenLite.set(node, {scaleX: maxWidth / clientWidth});
			} else {
				TweenLite.set(node, {scaleX: 1});
			}
		}

		// attached() {
		// 	setTimeout(() => {
		// 		// Start the rotation
		// 		this.showSchedule();
		// 	}, 1500);
		// },

		// fitContent() {
		// 	const maxWidth = this.$.body.clientWidth - 32;
		// 	const contentWidth = this.$.content.clientWidth;
		// 	const delta = contentWidth - maxWidth;
		// 	if (delta > 1) {
		// 		TweenLite.set(this.$.content, {scaleX: maxWidth / contentWidth});
		// 	} else {
		// 		TweenLite.set(this.$.content, {scaleX: 1});
		// 	}
		// },

		// enter() {
		// 	this.tl.to(this.$.label, 0.8, {
		// 		y: '0%',
		// 		ease: Back.easeInOut.config(1.7)
		// 	});

		// 	this.tl.to(this.$.body, 0.66, {
		// 		scaleX: '1',
		// 		ease: Power3.easeInOut
		// 	});

		// 	this.tl.to(this.$.content, 0.66, {
		// 		y: '0%',
		// 		ease: Power3.easeOut
		// 	}, '-=0.18');
		// },

		// exit() {
		// 	this.tl.call(() => {
		// 		this.tl.pause();
		// 		let duration = Math.max(this.$.body.clientWidth / 500, 0.9);
		// 		duration = Math.min(duration, 1.8);
		// 		TweenLite.to(this.$.label, duration, {
		// 			x: this.$.body.clientWidth + 1,
		// 			ease: Power3.easeInOut,
		// 			onComplete: function () {
		// 				this.tl.resume();
		// 			}.bind(this)
		// 		});
		// 	}, null, null, '+=0.01');

		// 	this.tl.set(this.$.body, {scaleX: 0});
		// 	this.tl.set(this.$.content, {y: '100%'});

		// 	this.tl.to(this.$.label, 0.4, {
		// 		y: '100%',
		// 		ease: Power3.easeIn
		// 	}, '-=0.08');

		// 	this.tl.set(this.$.label, {x: 0});
		// },

		// showSchedule() {
		// 	this.tl.call(() => {
		// 		this.$.content.style.width = 'auto';
		// 		this.customStyle['--toth-ticker-content-color'] = '#f47425';
		// 		this.updateStyles();
		// 		this.$.label.innerText = 'ON NOW';
		// 		this.$.content.innerHTML = onNow.value;
		// 		this.fitContent();
		// 	});
		// 	this.enter();
		// 	this.tl.to({}, INTERVAL, {});
		// 	this.exit();

		// 	if (upNext.value) {
		// 		this.tl.call(() => {
		// 			this.$.label.innerText = 'UP NEXT';
		// 			this.$.content.innerHTML = upNext.value;
		// 			this.fitContent();
		// 		});
		// 		this.enter();
		// 		this.tl.to({}, INTERVAL, {});
		// 		this.exit();
		// 	}

		// 	this.tl.call(this.showCTA, null, this);
		// },

		// showCTA() {
		// 	this.tl.to(this.$.cta, 0.66, {
		// 		y: '0%',
		// 		ease: Back.easeOut.config(0.9)
		// 	});

		// 	this.tl.to(this.$.cta, 1, {
		// 		y: '-100%',
		// 		ease: Back.easeInOut.config(0.9)
		// 	}, `+=${INTERVAL}`);

		// 	this.tl.to(this.$.cta, 0.66, {
		// 		y: '-200%',
		// 		ease: Back.easeIn.config(0.9)
		// 	}, `+=${INTERVAL}`);

		// 	this.tl.set(this.$.cta, {y: '100%'});

		// 	this.tl.call(this.showSchedule, null, this);
		// }
	});
})();
