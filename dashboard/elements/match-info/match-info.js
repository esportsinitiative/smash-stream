(function () {
	'use strict';

	const matchTitle = nodecg.Replicant('matchTitle');
	const matchFormat = nodecg.Replicant('matchFormat');
	const player1 = nodecg.Replicant('player1');
	const player2 = nodecg.Replicant('player2');

	// Used to programmatically access any of the above 8 replicants, via `REPLICANTS[name]`.
	const REPLICANTS = {
		matchTitle,
		matchFormat,
		player1,
		player2
	};

	Polymer({
		is: 'match-info',

		ready() {
			matchTitle.on('change', newVal => {
				this.matchTitle = {};
				this.matchTitle = newVal;
			});

			matchFormat.on('change', newVal => {
				this.matchFormat = {};
				this.matchFormat = newVal;
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
			if (this.matchTitle.next != '') {
				this.matchTitle.current = this.matchTitle.next;
				this.matchTitle.next = '';
			}
			if (this.matchFormat.next != '') {
				this.matchFormat.current = this.matchFormat.next;
				this.matchFormat.next = '';
			}
		},

		hideGameInfo() {
			this.matchInfoVisible = false;
		},

		showGameInfo() {
			this.matchInfoVisible = true;
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
