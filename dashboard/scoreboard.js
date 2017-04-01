(function () {
	'use strict';

	const show = document.getElementById('show');
	const update = document.getElementById('update');
	const hide = document.getElementById('hide');
	const swap = document.getElementById('swap');
	const leftScore = document.querySelectorAll('paper-input[label="Score"]')[0];
	const bluTag = document.querySelectorAll('paper-input[label="Tag"]')[0];
	const rightScore = document.querySelectorAll('paper-input[label="Score"]')[1];
	const redTag = document.querySelectorAll('paper-input[label="Tag"]')[1];
	const scoreboardShowing = nodecg.Replicant('scoreboardShowing');
	const scores = nodecg.Replicant('scores');

	scores.on('change', newVal => {
		leftScore.value = newVal.blu.score;
		bluTag.value = newVal.blu.tag;
		rightScore.value = newVal.red.score;
		redTag.value = newVal.red.tag;
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

	update.addEventListener('click', doUpdate);

	hide.addEventListener('click', () => {
		scoreboardShowing.value = false;
	});

	swap.addEventListener('click', () => {
		scores.value = {
			red: {
				score: scores.value.blu.score,
				tag: scores.value.blu.tag
			},
			blu: {
				score: scores.value.red.score,
				tag: scores.value.red.tag
			}
		};
	});

	function doUpdate() {
		scores.value = {
			red: {
				score: rightScore.value,
				tag: redTag.value
			},
			blu: {
				score: leftScore.value,
				tag: bluTag.value
			}
		};
	}
})();
