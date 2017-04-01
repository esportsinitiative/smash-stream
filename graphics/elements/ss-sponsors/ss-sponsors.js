(function () {
	'use strict';

	Polymer({
		is: 'ss-sponsors',

		properties: {
			logoUrls: {
				type: Array,
				value: [
					'url("img/sponsors/twitch.png")',
					'url("img/sponsors/xsplit.png")',
					'url("img/sponsors/smash-n-splash.png")'
				]
			},
			duration: {
				type: Number,
				value: 17
			},
			interval: {
				type: Number,
				value: 0
			},
			fadeTime: {
				type: Number,
				value: 0.5
			},
			tl: {
				type: Object,
				value: new TimelineLite({autoRemoveChildren: true})
			}
		},

		show() {
			const self = this;

			// Clear any existing tweens
			this.tl.clear();

			// Slide in from left
			this.tl.to(this, 0.6, {
				x: 0,
				ease: Power2.easeOut
			});

			// Show the first logo
			this.tl.set(this.$.currentLogo, {backgroundImage: this.logoUrls[0]});
			this.tl.to(this.$.currentLogo, this.fadeTime, {
				opacity: 1,
				ease: Power1.easeInOut
			});

			// Set up tweens for each subsequent logo
			for (let i = 1; i < this.logoUrls.length; i++) {
				// Load the next logo into #nextLogo
				this.tl.set(this.$.nextLogo, {backgroundImage: this.logoUrls[i]}, `+=${this.duration}`);

				// Crossfade from #currentLogo to #nextLogo
				this.tl.to(this.$.currentLogo, this.fadeTime, {
					opacity: 0,
					ease: Power1.easeInOut
				});
				this.tl.to(this.$.nextLogo, this.fadeTime, {
					opacity: 1,
					ease: Power1.easeInOut
				});

				// Move #nextLogo's image into #currentLogo, and reset everything else.
				this.tl.call(idx => {
					self.$.currentLogo.style.backgroundImage = self.logoUrls[idx];
					self.$.currentLogo.style.opacity = 1;
					self.$.nextLogo.style.opacity = 0;
				}, [i]);
			}

			// Hide the last logo
			this.tl.to(this.$.currentLogo, this.fadeTime, {
				opacity: 0,
				ease: Power1.easeInOut
			}, `+=${this.duration}`);

			// Slide out to right
			this.tl.to(this, 0.6, {
				x: 300,
				ease: Power2.easeIn
			});
		},

		ready() {
			TweenLite.set(this, {x: 300});

			// Show every 10 minutes
			this.show();
			setInterval(this.show.bind(this), ((this.duration + 2) * this.logoUrls.length) * 1000);
		}
	});
})();
