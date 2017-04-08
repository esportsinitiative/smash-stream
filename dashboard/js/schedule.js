(function () {
	'use strict';

	const upNext = nodecg.Replicant('upNext');
	const upThen = nodecg.Replicant('upThen');
	const upNextInput = document.getElementById('upNext');
	const upThenInput = document.getElementById('upThen');
	const upNextMonitor = document.getElementById('monitor-upNext');
	const upThenMonitor = document.getElementById('monitor-upThen');
	const update = document.getElementById('update');

	upNext.on('change', newVal => {
		upNextMonitor.innerText = newVal;
	});

	upThen.on('change', newVal => {
		upThenMonitor.innerText = newVal;
	});

	update.addEventListener('click', () => {
		upNext.value = upNextInput.value;
		upThen.value = upThenInput.value;
	});
})();
