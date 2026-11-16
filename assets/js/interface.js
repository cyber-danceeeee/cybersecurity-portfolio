(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clock = document.querySelector('#live-clock');
  const uptime = document.querySelector('#session-uptime');
  const terminalText = document.querySelector('#terminal-text');
  const sessionStart = Date.now();

  const pad = value => String(value).padStart(2, '0');

  function updateTelemetry() {
    if (clock) {
      clock.textContent = `${new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kuala_Lumpur',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date())} MYT`;
    }

    if (uptime) {
      const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      uptime.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
  }

  updateTelemetry();
  window.setInterval(updateTelemetry, 1000);

  const messages = [
    '[ok] lab boundary verified',
    '[scan] localhost:8000 identified',
    '[safe] third-party targets excluded',
    '[git] evidence chain synchronized',
    '[ready] portfolio telemetry online'
  ];

  let messageIndex = 0;
  let characterIndex = 0;
  let typingTimer;

  function typeMessage() {
    if (!terminalText) return;
    const message = messages[messageIndex];
    terminalText.textContent = message.slice(0, characterIndex++);

    if (characterIndex <= message.length) {
      typingTimer = window.setTimeout(typeMessage, 42);
      return;
    }

    typingTimer = window.setTimeout(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      characterIndex = 0;
      typeMessage();
    }, 1900);
  }

  if (terminalText) {
    terminalText.textContent = messages[0];
    if (!reduceMotion.matches) {
      characterIndex = 0;
      typeMessage();
    }
  }

  const revealTargets = document.querySelectorAll('.section, .project-card, .skill-card');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -45px' });
    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  }

  const canvas = document.querySelector('#matrix-canvas');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero || reduceMotion.matches) return;

  const context = canvas.getContext('2d');
  const glyphs = '01<>/{}[]$#*+SECURE';
  let columns = [];
  let animationFrame;
  let previousFrame = 0;

  function sizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    columns = Array.from({ length: Math.ceil(width / 24) }, () => Math.random() * -height / 18);
  }

  function drawMatrix(timestamp) {
    animationFrame = window.requestAnimationFrame(drawMatrix);
    if (document.hidden || timestamp - previousFrame < 70) return;
    previousFrame = timestamp;

    const width = hero.clientWidth;
    const height = hero.clientHeight;
    context.fillStyle = 'rgba(7, 17, 31, .10)';
    context.fillRect(0, 0, width, height);
    context.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
    context.fillStyle = 'rgba(61, 224, 197, .18)';

    columns.forEach((position, index) => {
      const character = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = index * 24;
      const y = position * 18;
      context.fillText(character, x, y);
      columns[index] = y > height && Math.random() > .975 ? Math.random() * -18 : position + 1;
    });
  }

  sizeCanvas();
  window.addEventListener('resize', sizeCanvas, { passive: true });
  animationFrame = window.requestAnimationFrame(drawMatrix);

  reduceMotion.addEventListener('change', event => {
    if (event.matches) {
      window.clearTimeout(typingTimer);
      window.cancelAnimationFrame(animationFrame);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
})();
