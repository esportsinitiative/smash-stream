(function () {
	'use strict';

	const gameTitle = nodecg.Replicant('gameTitle');
	const gameType = nodecg.Replicant('gameType');
	const player1 = nodecg.Replicant('player1');
	const player2 = nodecg.Replicant('player2');

	// Used to programmatically access any of the above 8 replicants, via `REPLICANTS[name]`.
	const REPLICANTS = {
		gameTitle,
		gameType,
		player1,
		player2
	};

	Polymer({
		is: 'smash-names-control',

		ready() {
			gameTitle.on('change', newVal => {
				this.gameTitle = {};
				this.gameTitle = newVal;
			});

			gameType.on('change', newVal => {
				this.gameType = {};
				this.gameType = newVal;
			});

			player1.on('change', newVal => {
				this.player1 = {};
				this.player1 = newVal;
			});

			player2.on('change', newVal => {
				this.player2 = {};
				this.player2 = newVal;
			});
		},

		updateGameInfo() {
			if (this.gameTitle.next != '') {
				this.gameTitle.current = this.gameTitle.next;
				this.gameTitle.next = '';
			}
			if (this.gameType.next != '') {
				this.gameType.current = this.gameType.next;
				this.gameType.next = '';
			}
		},

		hideGameInfo() {
			this.gameInfoVisible = false;
		},

		showGameInfo() {
			this.gameInfoVisible = true;
		},

		updatePlayers() {
			if (this.player1.next != '') {
				this.player1.current = this.player1.next;
				this.player1.next = '';
			}
			if (this.player2.next != '') {
				this.player2.current = this.player2.next;
				this.player2.next = '';
			}
		},

		hidePlayers() {
			this.playersVisible = false;
		},

		showPlayers() {
			this.playersVisible = true;
		},

		_handleSelectedItemChangedNext(e) {
			if (this.isDebouncerActive('_handleSelectedItemChangedNext')) {
				return;
			}

			const target = e.target;
			const slot = target.getAttribute('data-slot');

			if (!e.detail.value || !replicant) {
				return;
			}

			// Copy the values out individually, to avoid object reference problems down the line.
			const selectedItem = {
				next: e.detail.value.next
			};

			// Clear out the target's selected item once we have it.
			e.target.value = null;
		},

		_handleSelectedItemChanged(e) {
			if (this.isDebouncerActive('_handleSelectedItemChanged')) {
				return;
			}

			const target = e.target;
			const slot = target.getAttribute('data-slot');
			const replicant = REPLICANTS[slot];

			if (!e.detail.value || !replicant) {
				return;
			}

			// Copy the values out individually, to avoid object reference problems down the line.
			const selectedItem = {
				next: e.detail.value.next,
				current: e.detail.value.current
			};

			// Clear out the target's selected item once we have it.
			e.target.value = null;

			this.debounce('_handleSelectedItemChanged', () => {
				replicant.value = selectedItem;
			});
		}
	});
})();
