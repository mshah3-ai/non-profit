(function () {
	var revealEls = document.querySelectorAll('.reveal-up');
	if (!revealEls.length || !('IntersectionObserver' in window)) return;

	var observer = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
	);

	revealEls.forEach(function (el) {
		observer.observe(el);
	});
})();

(function () {
	var slots = Array.prototype.slice.call(document.querySelectorAll('.card-slot'));
	if (slots.length < 2) return;

	var cards = slots.map(function (slot) {
		return slot.querySelector('.info-card');
	});

	var rippleSection = document.getElementById('ripple-section');

	var SHRINK_PER_LEVEL = 0.06;
	var ticking = false;

	function updateScales() {
		var vh = window.innerHeight;

		// progress[i] = how much slot i+1 currently covers slot i (0 to 1)
		var progress = [];
		for (var i = 0; i < slots.length - 1; i++) {
			var nextTop = slots[i + 1].getBoundingClientRect().top;
			var nextStick = parseFloat(getComputedStyle(slots[i + 1]).top) || 0;
			var p = (vh - nextTop) / (vh - nextStick);
			progress[i] = Math.max(0, Math.min(1, p));
		}

		// One final stage: as the page moves past the last card into the next
		// section, it also joins the cascade so it isn't left permanently
		// full-size while everything behind it keeps shrinking.
		if (rippleSection) {
			var rippleTop = rippleSection.getBoundingClientRect().top;
			var p = (vh - rippleTop) / vh;
			progress.push(Math.max(0, Math.min(1, p)));
		}

		// Each card shrinks once for every covering transition happening at or
		// after its own position, so earlier cards keep shrinking further as
		// later cards cover the ones on top of them — a chained cascade.
		for (var c = 0; c < cards.length; c++) {
			var shrinkSum = 0;
			for (var j = c; j < progress.length; j++) {
				shrinkSum += progress[j];
			}
			var scale = 1 - shrinkSum * SHRINK_PER_LEVEL;
			cards[c].style.transform = 'scale(' + scale + ')';
		}

		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(updateScales);
			ticking = true;
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	updateScales();
})();
