(function () {
	'use strict';

	Polymer({
		is: 'ss-social',

		ready() {
			this.tl = new TimelineLite({autoRemoveChildren: true});

			const socialData = {
				hashtag: "#shufflebotm",
				website: "esi.gg",
				twitter: "@ESI_OSU",
				facebook: "/esportsinitiative",
				instagram: "/esportsinitiative"
			};

			this.$$('#hashtag').innerHTML = socialData.hashtag;
			this.$$('#website').innerHTML = socialData.website;
			this.$$('#twitter').innerHTML = socialData.twitter;
			this.$$('#facebook').innerHTML = socialData.facebook;
			this.$$('#instagram').innerHTML = socialData.instagram;
		}
	});
})();
