const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const progress = document.querySelector('.reading-progress');
if (progress) {
  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = height > 0 ? (window.scrollY / height) * 100 : 0;
    progress.style.width = `${Math.min(100, percentage)}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
}
