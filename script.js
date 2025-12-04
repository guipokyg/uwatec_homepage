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

  // Hero 밝기 조절
const hero = document.querySelector('#hero');
const leftBg = document.querySelector('.hero-left-bg');

function updateHeroBrightness() {

  const rect = hero.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 화면 중앙 기준으로 얼마나 멀어졌는지(0 ~ 1)
  const distance = Math.min(Math.max(rect.top * -1 / windowHeight, 0), 1);

  // 밝기값: 위에 가까울수록 1, 아래로 갈수록 0.4까지 감소
  const brightness = 1 - (distance * 0.6);

  leftBg.style.setProperty('--hero-brightness', brightness);
}

window.addEventListener('scroll', updateHeroBrightness);
window.addEventListener('load', updateHeroBrightness);
});
