(function () {
	var form = document.getElementById('contact-form');
	var status = document.getElementById('contact-form-status');
	if (!form || !status) return;

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		status.textContent = 'Thanks for reaching out! We’ll get back to you soon.';
		form.reset();
	});
})();
