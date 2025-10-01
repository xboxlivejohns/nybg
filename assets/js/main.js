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

  const statusElement = document.querySelector('[data-hours-status]');
  if (statusElement instanceof HTMLElement) {
    const schedule = [
      null,
      { open: '08:00', close: '17:00' },
      { open: '08:00', close: '17:00' },
      { open: '08:00', close: '17:00' },
      { open: '08:00', close: '17:00' },
      { open: '08:00', close: '17:00' },
      { open: '09:00', close: '13:00' }
    ];

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const timeStringToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const formatTime = (time) => time;

    const now = new Date();
    const currentDayIndex = now.getDay();
    const todaysHours = schedule[currentDayIndex];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const findNextOpening = (startOffset) => {
      for (let offset = startOffset; offset < startOffset + 7; offset += 1) {
        const dayIndex = (currentDayIndex + offset) % 7;
        const hours = schedule[dayIndex];
        if (!hours) continue;
        return { offset, dayIndex, hours };
      }
      return null;
    };

    if (todaysHours) {
      const openMinutes = timeStringToMinutes(todaysHours.open);
      const closeMinutes = timeStringToMinutes(todaysHours.close);

      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        statusElement.textContent = `We're open until ${formatTime(todaysHours.close)} today.`;
        return;
      }

      if (currentMinutes < openMinutes) {
        statusElement.textContent = `We're closed until ${formatTime(todaysHours.open)} today.`;
        return;
      }
    }

    const nextOpening = findNextOpening(1);
    if (nextOpening) {
      const { offset, dayIndex, hours } = nextOpening;
      const timeText = formatTime(hours.open);
      if (offset === 1) {
        statusElement.textContent = `We're closed until ${timeText} tomorrow.`;
      } else {
        statusElement.textContent = `We're closed until ${timeText} on ${dayNames[dayIndex]}.`;
      }
    } else {
      statusElement.textContent = 'Please contact us for our next opening times.';
    }
  }
})();
