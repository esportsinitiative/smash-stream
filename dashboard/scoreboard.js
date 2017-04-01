(function () {
	'use strict';

	const show = document.getElementById('show');
	const update = document.getElementById('update');
	const hide = document.getElementById('hide');
	const swap = document.getElementById('swap');
	const leftScore = document.querySelectorAll('paper-input[label="Score"]')[0];
	// const leftTag = document.querySelectorAll('paper-input[label="Tag"]')[0];
	const rightScore = document.querySelectorAll('paper-input[label="Score"]')[1];
	// const rightTag = document.querySelectorAll('paper-input[label="Tag"]')[1];
	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');

	const leftTag = {value: 'left'};
	const rightTag = {value: 'right'};

	scores.on('change', newVal => {
		if (newVal != undefined) {
			leftScore.value = newVal.left.score;
			leftTag.value = newVal.left.tag;
			rightScore.value = newVal.right.score;
			rightTag.value = newVal.right.tag;
		}
	});

	scoreboardShowing.on('change', newVal => {
		if (newVal) {
			show.setAttribute('hidden', 'true');
			update.removeAttribute('hidden');
			hide.removeAttribute('disabled');
		} else {
			show.removeAttribute('hidden');
			update.setAttribute('hidden', 'true');
			hide.setAttribute('disabled', 'true');
		}
	});

	show.addEventListener('click', () => {
		doUpdate();
		scoreboardShowing.value = true;
	});

	update.addEventListener('click', () => {
		doUpdate();
	});

	hide.addEventListener('click', () => {
		scoreboardShowing.value = false;
	});

	swap.addEventListener('click', () => {
		scores.value = {
			right: {
				score: scores.value.left.score,
				tag: scores.value.left.tag
			},
			left: {
				score: scores.value.right.score,
				tag: scores.value.right.tag
			}
		};
	});

	function doUpdate() {
		scores.value = {
			right: {
				score: rightScore.value,
				tag: rightTag.value
			},
			left: {
				score: leftScore.value,
				tag: leftTag.value
			}
		};
	}
})();
