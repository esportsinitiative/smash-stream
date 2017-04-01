(function () {
	'use strict';

	const gameTitle = nodecg.Replicant('gameTitle');
	const gameType = nodecg.Replicant('gameType');
	const player1 = nodecg.Replicant('player1');
	const player2 = nodecg.Replicant('player2');
	const gameInfoVisible = nodecg.Replicant('gameInfoVisible');
	const playerVisible = nodecg.Replicant('playerVisible');

	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');

	/* Pixels */
	const MAX_PLAYER_NAME_WIDTH = 240;
	const MAX_HEADER_WIDTH = 460;

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

			gameTitle.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.gameTitle = null;
				} else {
					this.gameTitle = {};
					this.gameTitle = newVal;
				}

				if (!this._gameTitleReady) {
					this._gameTitleReady = true;
					this._checkReplicantsReady();
				}
			});

			gameType.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
					this.gameType = null;
				} else {
					this.gameType = {};
					this.gameType = newVal;
				}

				if (!this._gameTypeReady) {
					this._gameTypeReady = true;
					this._checkReplicantsReady();
				}
			});

			player1.on('change', newVal => {
				if (!newVal.next.trim() && !newVal.current.trim()) {
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
				if (!newVal.next.trim() && !newVal.current.trim()) {
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
			if (this._gameTitleReady && this._gameTypeReady && this._player1Ready && this._player2Ready) {
				console.log('all replicants ready, adding change handlers for couchVisible and playerVisible');
				gameInfoVisible.on('change', this.gameInfoVisibleChanged.bind(this));
				playerVisible.on('change', this.playersVisibleChanged.bind(this));
			}
		},

		gameInfoVisibleChanged(newVal) {
			if (newVal) {
				this.tl.add('matchInfoEnter');

				if (this.gameTitle) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#match-title .header-info'), this.gameTitle.current, MAX_HEADER_WIDTH);
					}, null, null, 'matchInfoEnter');

					this.tl.to('#match-title', 0.5, {
						opacity: 1,
						x: 0,
						ease: Power2.easeOut
					}, 'matchInfoEnter');
				}

				if (this.gameType) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#match-type .header-info'), this.gameType.current, MAX_HEADER_WIDTH);
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
