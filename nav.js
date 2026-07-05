(function () {
	if (window.lucide) {
		window.lucide.createIcons();
	}

	var header = document.getElementById('site-header');
	var SCROLL_THRESHOLD = 10;

	function onScroll() {
		if (window.scrollY > SCROLL_THRESHOLD) {
			header.classList.add('is-scrolled');
		} else {
			header.classList.remove('is-scrolled');
		}
	}
	window.addEventListener('scroll', onScroll);
	onScroll();

	// Desktop dropdown menus
	var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));

	function closeAllDropdowns(except) {
		navItems.forEach(function (item) {
			if (item !== except) {
				item.classList.remove('is-open');
				var trigger = item.querySelector('.nav-trigger');
				if (trigger) trigger.setAttribute('aria-expanded', 'false');
			}
		});
	}

	navItems.forEach(function (item) {
		var trigger = item.querySelector('.nav-trigger');
		if (!trigger) return;
		trigger.addEventListener('click', function (e) {
			e.stopPropagation();
			var isOpen = item.classList.contains('is-open');
			closeAllDropdowns();
			if (!isOpen) {
				item.classList.add('is-open');
				trigger.setAttribute('aria-expanded', 'true');
			} else {
				trigger.setAttribute('aria-expanded', 'false');
			}
		});
	});

	document.addEventListener('click', function () {
		closeAllDropdowns();
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			closeAllDropdowns();
			closeMobileMenu();
		}
	});

	// Mobile menu
	var menuToggle = document.getElementById('menu-toggle');
	var mobileMenu = document.getElementById('mobile-menu');

	function openMobileMenu() {
		menuToggle.classList.add('is-open');
		menuToggle.setAttribute('aria-expanded', 'true');
		mobileMenu.classList.add('is-open');
		document.body.style.overflow = 'hidden';
	}

	function closeMobileMenu() {
		menuToggle.classList.remove('is-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		mobileMenu.classList.remove('is-open');
		document.body.style.overflow = '';
	}

	menuToggle.addEventListener('click', function (e) {
		e.stopPropagation();
		if (mobileMenu.classList.contains('is-open')) {
			closeMobileMenu();
		} else {
			openMobileMenu();
		}
	});

	window.addEventListener('resize', function () {
		if (window.innerWidth >= 768 && mobileMenu.classList.contains('is-open')) {
			closeMobileMenu();
		}
	});
})();
