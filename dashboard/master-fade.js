(function () {
	'use strict';

	const show = document.getElementById('fade-in');
	const hide = document.getElementById('fade-out');
	const mainShowing = nodecg.Replicant('mainShowing', {defaultValue: true});

	mainShowing.on('change', newVal => {
		if (newVal) {
			show.setAttribute('disabled', 'true');
			hide.removeAttribute('disabled');
		} else {
			show.removeAttribute('disabled');
			hide.setAttribute('disabled', 'true');
		}
	});

	show.addEventListener('click', () => {
		mainShowing.value = true;
	});

	hide.addEventListener('click', () => {
		mainShowing.value = false;
	});
})();
