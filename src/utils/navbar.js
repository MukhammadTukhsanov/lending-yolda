// Navbar scroll effects and interactions
export const initNavbarEffects = () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up function
    return () => window.removeEventListener('scroll', handleScroll);
  }

  // Active navigation link handling
  const navLinks = document.querySelectorAll('.nav-link-custom');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');

      // Handle smooth scrolling for anchor links
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // Mobile menu auto-close
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          navbarCollapse.classList.remove('show');
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  }

  // Animate navbar on page load
  const animateNavbar = () => {
    if (navbar) {
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.6s ease';

      setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
      }, 100);
    }
  };

  // Initialize animations
  animateNavbar();
};

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initNavbarEffects);
}
