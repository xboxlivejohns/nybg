(function () {
  const header = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');

  if (toggle && header && nav) {
    toggle.addEventListener('click', () => {
      const open = header.getAttribute('data-nav-open') === 'true';
      const nextState = !open;
      header.setAttribute('data-nav-open', String(nextState));
      toggle.setAttribute('aria-expanded', String(nextState));
      if (nextState) {
        nav.querySelector('a')?.focus();
      }
    });

    nav.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        header.setAttribute('data-nav-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (event) => {
      const targetId = skipLink.getAttribute('href')?.replace('#', '');
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.addEventListener(
        'blur',
        () => {
          target.removeAttribute('tabindex');
        },
        { once: true }
      );
    });
  }

  const rippleButtons = document.querySelectorAll('[data-ripple]');
  rippleButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.currentTarget;
      if (!(target instanceof HTMLElement)) return;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event instanceof MouseEvent ? event.clientX - rect.left - size / 2 : rect.width / 2;
      const y = event instanceof MouseEvent ? event.clientY - rect.top - size / 2 : rect.height / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      target.appendChild(ripple);

      ripple.addEventListener(
        'animationend',
        () => {
          ripple.remove();
        },
        { once: true }
      );
    });
  });
})();
