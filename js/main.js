document.addEventListener('DOMContentLoaded', function() {

    const navbar = document.querySelector('.navbar');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const animatedElements = document.querySelectorAll('.animate');

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      checkAnimatedElements();
    }

    function openMobileMenu() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    function toggleDarkMode() {
      const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
      if (isDarkMode) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      }
    }

    function checkThemePreference() {
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {

        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    }

    function setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();

          if (mobileMenu.classList.contains('open')) {
            closeMobileMenu();
          }

          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, 
              behavior: 'smooth'
            });
          }
        });
      });
    }

    function checkAnimatedElements() {
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('in-view');
        }
      });
    }

    window.addEventListener('scroll', handleScroll);
    if (mobileMenuButton) mobileMenuButton.addEventListener('click', openMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', function() {
        const targetSection = document.querySelector('#learn-more');
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    }

    checkThemePreference();
    setupSmoothScroll();
    checkAnimatedElements(); 

    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  });