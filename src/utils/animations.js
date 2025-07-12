// Scroll animations
export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in-up class
  const animatedElements = document.querySelectorAll('.fade-in-up');
  animatedElements.forEach((el) => observer.observe(el));

  // Stats counter animation
  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach((stat) => {
      const finalNumber = parseInt(stat.textContent);
      if (isNaN(finalNumber)) return;

      let currentNumber = 0;
      const increment = finalNumber / 30;
      const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
          stat.textContent = stat.textContent.includes('+')
            ? finalNumber + '+'
            : stat.textContent.includes('daqiqa')
            ? finalNumber + ' daqiqa'
            : finalNumber + (stat.textContent.includes('/') ? '/7' : '');
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(currentNumber);
        }
      }, 50);
    });
  };

  // Trigger stats animation when hero section is visible
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateStats, 1000);
          heroObserver.unobserve(entry.target);
        }
      });
    });
    heroObserver.observe(heroSection);
  }
};

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
}
