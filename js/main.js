// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Scroll-triggered reveal for the journey rail (respects prefers-reduced-motion via CSS)
(function () {
  var rail = document.querySelector('.journey-rail.reveal');
  if (!rail) return;

  if (!('IntersectionObserver' in window)) {
    rail.classList.add('is-visible');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        rail.classList.add('is-visible');
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(rail);
})();
