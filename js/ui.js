// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all fade-in sections
  document.querySelectorAll('.section-fade-in').forEach(section => {
    observer.observe(section);
  });
  
  // Mobile menu toggle
  document.querySelector('.mobile-menu-button').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.toggle('hidden');
  });
  
  // Dark mode functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const html = document.documentElement;
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    html.classList.add('dark');
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark'));
  });
  
  // Close mobile menu when clicking navigation links
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.mobile-menu').classList.add('hidden');
    });
  });