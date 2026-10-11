const button = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
button.addEventListener('click', () => {
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  button.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.querySelector('.scroll-progress span');
window.addEventListener('scroll', () => {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${available ? (window.scrollY / available) * 100 : 0}%`;
}, { passive: true });

document.querySelectorAll('.project-image').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    card.style.setProperty('--mouse-x', `${(x + .5) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y + .5) * 100}%`);
    card.style.transform = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) scale(1.012)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal-section').forEach((section) => revealObserver.observe(section));
} else {
  document.querySelectorAll('.reveal-section').forEach((section) => section.classList.add('is-visible'));
}

const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => navObserver.observe(section));

document.querySelectorAll('.magnetic').forEach((item) => {
  item.addEventListener('pointermove', (event) => {
    if (reducedMotion) return;
    const box = item.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    item.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
  });
  item.addEventListener('pointerleave', () => { item.style.transform = ''; });
});

const orb = document.querySelector('.hero-orb');
if (orb) {
  orb.addEventListener('pointermove', (event) => {
    if (reducedMotion) return;
    const box = orb.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    orb.style.setProperty('--orb-x', `${x * 16}px`);
    orb.style.setProperty('--orb-y', `${y * 16}px`);
    orb.classList.add('is-tracking');
  });
  orb.addEventListener('pointerleave', () => {
    orb.style.setProperty('--orb-x', '0px');
    orb.style.setProperty('--orb-y', '0px');
    orb.classList.remove('is-tracking');
  });
}
