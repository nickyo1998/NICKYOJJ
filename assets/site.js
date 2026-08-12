(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('[data-scroll]');

  const setHeader = () => header?.classList.toggle('is-solid', window.scrollY > 42);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileMenu?.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  navLinks.forEach((link) => link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12 });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('is-visible'));
  }

  const careerCursor = document.querySelector('.career-cursor');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (careerCursor && finePointer.matches) {
    const heroPhoto = document.querySelector('.career-page .hero-photo');
    const cursorLabel = careerCursor.querySelector('span');
    const cursorTargets = document.querySelectorAll('.career-page a, .career-page button, .career-page iframe, .career-page .career-photo, .career-page .career-award, .career-page .about-portrait');

    window.addEventListener('pointermove', (event) => {
      careerCursor.style.left = `${event.clientX}px`;
      careerCursor.style.top = `${event.clientY}px`;
      careerCursor.classList.add('is-visible');

      if (heroPhoto) {
        const x = ((event.clientX / window.innerWidth) - .5) * 10;
        const y = ((event.clientY / window.innerHeight) - .5) * 7;
        heroPhoto.style.setProperty('--career-x', x.toFixed(2));
        heroPhoto.style.setProperty('--career-y', y.toFixed(2));
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => careerCursor.classList.remove('is-visible'));
    cursorTargets.forEach((target) => {
      target.addEventListener('pointerenter', () => {
        const label = target.dataset.cursorLabel || (target.tagName === 'IFRAME' ? 'Watch' : target.matches('.career-photo, .career-award') ? 'View' : 'Open');
        if (cursorLabel) cursorLabel.textContent = label;
        careerCursor.classList.add('is-active');
      });
      target.addEventListener('pointerleave', () => {
        careerCursor.classList.remove('is-active');
        if (cursorLabel) cursorLabel.textContent = 'Open';
      });
    });

    document.querySelectorAll('[data-magnetic]').forEach((target) => {
      target.addEventListener('pointermove', (event) => {
        const box = target.getBoundingClientRect();
        const x = (event.clientX - box.left - box.width / 2) * .09;
        const y = (event.clientY - box.top - box.height / 2) * .12;
        target.style.transform = `translate(${x}px, ${y}px)`;
      });
      target.addEventListener('pointerleave', () => { target.style.transform = ''; });
    });
  }
})();
