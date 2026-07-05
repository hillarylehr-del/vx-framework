// Generic Formspree AJAX handler.
// Usage: <form data-formspree data-success-message="...">
(function () {
  var forms = document.querySelectorAll('form[data-formspree]');

  forms.forEach(function (form) {
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');
    var successMessage = form.getAttribute('data-success-message') || 'Thank you.';

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
      }

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            form.querySelectorAll('.form-field, .checkbox-field, .radio-group').forEach(function (el) {
              el.style.display = 'none';
            });
            if (status) {
              status.textContent = successMessage;
              status.classList.remove('error');
              status.classList.add('success', 'is-visible');
            }
            if (submitBtn) submitBtn.style.display = 'none';
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Something went wrong. Please try again, or email us directly.';
            status.classList.remove('success');
            status.classList.add('error', 'is-visible');
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText;
          }
        });
    });
  });
})();
