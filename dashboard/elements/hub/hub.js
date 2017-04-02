(function () {
	'use strict';

	const hubTitle = nodecg.Replicant('hubTitle');
	const hubCommentatorLeft = nodecg.Replicant('hubCommentatorLeft');
	const hubCommentatorRight = nodecg.Replicant('hubCommentatorRight');
	const hubShowUpdate = nodecg.Replicant('hubShowUpdate');


	// Used to programmatically access any of the above 8 replicants, via `REPLICANTS[name]`.
	const REPLICANTS = {
		hubTitle,
		hubCommentatorLeft,
		hubCommentatorRight
	};

	Polymer({
		is: 'ss-hub',

		ready() {
			hubTitle.on('change', newVal => {
				this.hubTitle = {};
				this.hubTitle = newVal;
			});

			hubCommentatorLeft.on('change', newVal => {
				this.hubCommentatorLeft = {};
				this.hubCommentatorLeft = newVal;
			});

			hubCommentatorRight.on('change', newVal => {
				this.hubCommentatorRight = {};
				this.hubCommentatorRight = newVal;
			});
		},

		updateHub() {
			if (this.hubTitle.next != '') {
				this.hubTitle.current = this.hubTitle.next;
				this.hubTitle.next = '';
			}
			if (this.hubCommentatorLeft.next != '') {
				this.hubCommentatorLeft.current = this.hubCommentatorLeft.next;
				this.hubCommentatorLeft.next = '';
			}
			if (this.hubCommentatorRight.next != '') {
				this.hubCommentatorRight.current = this.hubCommentatorRight.next;
				this.hubCommentatorRight.next = '';
			}
		},

		showHubUpdates() {
			this.hubShowUpdate = !this.hubShowUpdate;
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
