/* ═══════════════════════════════════════════════════
   DRA. LAYLA SERRANO — Script
   ═══════════════════════════════════════════════════ */

/* ─── Header scroll shadow ─── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── Hamburger / Mobile Nav ─── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-nav__link');

function openNav()  { mobileNav.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeNav() { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }

hamburger.addEventListener('click', openNav);
mobileClose.addEventListener('click', closeNav);
mobileLinks.forEach(l => l.addEventListener('click', closeNav));

/* ─── Accordion ─── */
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.accordion-body').style.maxHeight = null;
    });

    // Open clicked (if was closed)
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ─── Scroll reveal (Intersection Observer) ─── */
const revealTargets = document.querySelectorAll(
  '.sobre, .galeria__item, .review-card, .contato__info, .contato__mapa, .politica__inner'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  revealObserver.observe(el);
});

/* ─── Active nav link on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.header__nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.header__nav a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--gold)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));