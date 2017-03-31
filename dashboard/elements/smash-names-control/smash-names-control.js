(function () {
	'use strict';

	const player1 = nodecg.Replicant('player1');
	const player2 = nodecg.Replicant('player2');
	// const playerVisible = nodecg.Replicant('names-playerVisible');

	// Used to programmatically access any of the above 8 replicants, via `REPLICANTS[name]`.
	const REPLICANTS = {
		player1,
		player2
	};

	Polymer({
		is: 'smash-names-control',

		ready() {
			player1.on('change', newVal => {
				this.player1 = {};
				this.player1 = newVal;
			});

			player2.on('change', newVal => {
				this.player2 = {};
				this.player2 = newVal;
			});
		},

		hidePlayers() {
			this.playersVisible = false;
		},

		showPlayers() {
			this.playersVisible = true;
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
				name: e.detail.value.name,
				info: e.detail.value.info
			};

			// Clear out the target's selected item once we have it.
			e.target.value = null;

			this.debounce('_handleSelectedItemChanged', () => {
				replicant.value = selectedItem;
			});
		}
	});
})();
