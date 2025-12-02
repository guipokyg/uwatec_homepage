// 섹션 진입 감지 및 배경 그라디언트 전환
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('is-loaded');

  const sections = document.querySelectorAll('section[data-theme-key]');
  const reveals = document.querySelectorAll('.reveal');

  const themeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const key = entry.target.getAttribute('data-theme-key');
        document.body.setAttribute('data-theme', key);
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((section) => themeObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  reveals.forEach((el) => revealObserver.observe(el));
});
