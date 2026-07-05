(function () {
	var container = document.getElementById('team-testimonial');
	if (!container) return;

	var team = [
		{
			name: 'Mithil Shah',
			title: 'CEO &amp; Co-Founder',
			desc: 'Mithil co-founded the organization after watching a single piece of art bring his grandmother comfort during her battle with Alzheimer&rsquo;s. He leads the team&rsquo;s vision, partnerships, and overall strategy.'
		},
		{
			name: 'Akhil Narayanan',
			title: 'CFO &amp; Co-Founder',
			desc: 'Akhil oversees the organization&rsquo;s finances, from budgeting art kit distributions to managing grants and donations, so every dollar goes toward reaching more patients.'
		},
		{
			name: 'Pranshu Nautiyal',
			title: 'CTO &amp; Co-Founder',
			desc: 'Pranshu builds and maintains the technology behind the organization&rsquo;s work, from the website to the tools volunteers use to coordinate visits and track impact.'
		},
		{
			name: 'Aveek Sarkar',
			title: 'CGO &amp; Co-Founder',
			desc: 'Aveek leads growth and outreach, building relationships with care facilities, schools, and young artists to bring the organization&rsquo;s programs to more communities.'
		}
	];

	var nameEl = document.getElementById('tt-name');
	var titleEl = document.getElementById('tt-title');
	var descEl = document.getElementById('tt-desc');
	var cardEl = container.querySelector('.tt-card');
	var photoEl = container.querySelector('.tt-photo');
	var dotsEl = document.getElementById('tt-dots');
	var prevBtn = document.getElementById('team-prev');
	var nextBtn = document.getElementById('team-next');

	var currentIndex = 0;

	team.forEach(function (_, i) {
		var dot = document.createElement('button');
		dot.type = 'button';
		dot.className = 'tt-dot';
		dot.setAttribute('aria-label', 'Go to team member ' + (i + 1));
		dot.addEventListener('click', function () {
			goTo(i);
		});
		dotsEl.appendChild(dot);
	});

	var dots = Array.prototype.slice.call(dotsEl.querySelectorAll('.tt-dot'));

	function render() {
		var member = team[currentIndex];

		[cardEl, photoEl].forEach(function (el) {
			el.classList.remove('is-visible');
		});

		window.setTimeout(function () {
			nameEl.textContent = member.name;
			titleEl.innerHTML = member.title;
			descEl.innerHTML = member.desc;
			[cardEl, photoEl].forEach(function (el) {
				el.classList.add('is-visible');
			});
		}, 180);

		dots.forEach(function (dot, i) {
			dot.classList.toggle('is-active', i === currentIndex);
		});
	}

	function goTo(index) {
		currentIndex = (index + team.length) % team.length;
		render();
	}

	if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
	if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

	[cardEl, photoEl].forEach(function (el) {
		el.classList.add('is-visible');
	});
	dots[0].classList.add('is-active');
})();
