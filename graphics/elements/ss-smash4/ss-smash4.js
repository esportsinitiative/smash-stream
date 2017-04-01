(function () {
	'use strict';

	const matchTitle = nodecg.Replicant('matchTitle');
	const matchFormat = nodecg.Replicant('matchFormat');
	const player1 = nodecg.Replicant('player1');
	const player2 = nodecg.Replicant('player2');
	const matchInfoVisible = nodecg.Replicant('matchInfoVisible');
	const playerVisible = nodecg.Replicant('playerVisible');

	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');

	/* Pixels */
	const MAX_PLAYER_NAME_WIDTH = 240;
	const MAX_HEADER_WIDTH = 316;
	const BLANK_ELEMENT = {
		next: '',
		current: ''
	}

	Polymer({
		is: 'ss-smash4',

		properties: {
			rightScore: {
				type: Number,
				value: 0,
				observer: 'rightScoreChanged'
			},
			leftScore: {
				type: Number,
				value: 0,
				observer: 'leftScoreChanged'
			}
		},

		ready() {
			this.tl = new TimelineLite({autoRemoveChildren: true});

			matchTitle.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.matchTitle = BLANK_ELEMENT;
				} else {
					this.matchTitle = {};
					this.matchTitle = newVal;
				}

				if (!this._matchTitleReady) {
					this._matchTitleReady = true;
					this._checkReplicantsReady();
				}
			});

			matchFormat.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.matchFormat = BLANK_ELEMENT;
				} else {
					this.matchFormat = {};
					this.matchFormat = newVal;
				}

				if (!this._matchFormatReady) {
					this._matchFormatReady = true;
					this._checkReplicantsReady();
				}
			});

			player1.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.player1 = BLANK_ELEMENT;
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
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.player2 = BLANK_ELEMENT;
				} else {
					this.player2 = {};
					this.player2 = newVal;
				}

				if (!this._player2Ready) {
					this._player2Ready = true;
					this._checkReplicantsReady();
				}
			});
		},

		attached() {
			scores.on('change', newVal => {
				this.rightScore = newVal.red.score;
				this.leftScore = newVal.blu.score;
			});

			scoreboardShowing.on('change', this.scoreVisibleChange.bind(this));
		},

		// Only declare the "visible" replicants once all the other replicants are ready.
		_checkReplicantsReady() {
			if (this._matchTitleReady && this._matchFormatReady && this._player1Ready && this._player2Ready) {
				console.log('all replicants ready, adding change handlers for couchVisible and playerVisible');
				matchInfoVisible.on('change', this.matchInfoVisibleChanged.bind(this));
				playerVisible.on('change', this.playersVisibleChanged.bind(this));
			}
		},

		matchInfoVisibleChanged(newVal) {
			if (newVal) {
				this.tl.add('matchInfoEnter');

				if (this.matchTitle) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#match-title .header-info'), this.matchTitle.current, MAX_HEADER_WIDTH);
					}, null, null, 'matchInfoEnter');

					this.tl.to('#match-title', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'matchInfoEnter');
				}

				if (this.matchFormat) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#match-type .header-info'), this.matchFormat.current, MAX_HEADER_WIDTH);
					}, null, null, 'matchInfoEnter');

					this.tl.to('#match-type', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'matchInfoEnter');
				}
			} else {
				this.tl.add('matchInfoExit');

				this.tl.to([
					'#match-title'
				], 0.5, {
					opacity: 0,
					x: 25,
					ease: Power2.easeIn
				}, 'matchInfoExit');

				this.tl.to([
					'#match-type'
				], 0.5, {
					opacity: 0,
					x: -25,
					ease: Power2.easeIn
				}, 'matchInfoExit');
			}
		},

		playersVisibleChanged(newVal) {
			if (newVal) {
				this.tl.add('playersEnter');

				if (this.player1) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#player-name-left .player-name'), this.player1.current, MAX_PLAYER_NAME_WIDTH);
					}, null, null, 'playersEnter');

					this.tl.to('#player-name-left', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'playersEnter');
				}

				if (this.player2) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#player-name-right .player-name'), this.player2.current, MAX_PLAYER_NAME_WIDTH);
					}, null, null, 'playersEnter');

					this.tl.to('#player-name-right', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'playersEnter');
				}
			} else {
				this.tl.add('playersExit');

				this.tl.to([
					'#player-name-left'
				], 0.5, {
					opacity: 0,
					x: 25,
					ease: Power2.easeIn
				}, 'playersExit');

				this.tl.to([
					'#player-name-right'
				], 0.5, {
					opacity: 0,
					x: -25,
					ease: Power2.easeIn
				}, 'playersExit');
			}
		},

		scoreVisibleChange(newVal) {
			if (newVal) {
				this.tl.add('scoreVisibleEnter');

				this.tl.call(() => {
					this.$$('#score-left .score').innerText = this.leftScore;
					this.$$('#score-right .score').innerText = this.rightScore;
				}, null, null, 'scoreVisibleEnter');

				this.tl.to('#score-left', 0.5, {
					opacity: 1,
					x: 0,
					ease: Power2.easeOut
				}, 'scoreVisibleEnter');

				this.tl.to('#score-right', 0.5, {
					opacity: 1,
					x: 0,
					ease: Power2.easeOut
				}, 'scoreVisibleEnter');
			} else {
				this.tl.add('scoreVisibleExit');

				this.tl.to([
					'#score-left'
				], 0.5, {
					opacity: 0,
					ease: Power2.easeIn
				}, 'scoreVisibleExit');

				this.tl.to([
					'#score-right'
				], 0.5, {
					opacity: 0,
					ease: Power2.easeIn
				}, 'scoreVisibleExit');
			}
		},

		rightScoreChanged(newVal) {
			this.changeScore(this.$$('#score-left .score'), newVal);
		},

		leftScoreChanged(newVal) {
			this.changeScore(this.$$('#score-right .score'), newVal);
		},

		changeScore(scoreEl, newValue) {
			scoreEl.innerHTML = newValue;
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
	});
})();
