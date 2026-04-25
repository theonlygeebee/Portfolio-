const html        = document.documentElement;
const themeBtn    = document.getElementById('themeToggle');
const themeBtnMob = document.getElementById('themeToggleMobile');

const DARK_ICON  = '🌙';
const LIGHT_ICON = '☀️';

const savedTheme = localStorage.getItem('gb-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('gb-theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = theme === 'dark' ? LIGHT_ICON : DARK_ICON; // show opposite to switch to
  if (themeBtn)    themeBtn.textContent    = icon;
  if (themeBtnMob) themeBtnMob.textContent = icon;
}

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

if (themeBtn)    themeBtn.addEventListener('click', toggleTheme);
if (themeBtnMob) themeBtnMob.addEventListener('click', toggleTheme);


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));


const slider    = document.getElementById('slider');
const cardWidth = 340 + 20; // min-width + gap
let   sliderPos = 0;

document.getElementById('nextBtn').addEventListener('click', () => {
  const max = slider.scrollWidth - slider.clientWidth;
  sliderPos = Math.min(sliderPos + cardWidth, max);
  slider.scrollTo({ left: sliderPos, behavior: 'smooth' });
});

document.getElementById('prevBtn').addEventListener('click', () => {
  sliderPos = Math.max(sliderPos - cardWidth, 0);
  slider.scrollTo({ left: sliderPos, behavior: 'smooth' });
});


async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const btn = form.querySelector('.form-submit');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/xzdywvbp', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      btn.textContent = 'Message Sent';
      btn.style.background = '#16a34a';
      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    } else {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  } catch (error) {
    btn.textContent = 'Try Again';
    btn.disabled = false;
  }
}


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => scrollSpy.observe(s));