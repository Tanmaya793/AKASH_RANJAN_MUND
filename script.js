document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================
     STICKY NAVBAR & ACTIVE SCROLL
     ========================================== */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    // Sticky Class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Active Link Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id') || '';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================
     MOBILE NAVIGATION TOGGLE
     ========================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navLinksContainer = document.getElementById('navLinks');
  
  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    // Animate hamburger to X
    menuToggle.classList.toggle('open');
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      menuToggle.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.style.transform = 'none');
      spans[1].style.opacity = '1';
    });
  });

  /* ==========================================
     INTERACTIVE CAREER RECORDS TABS
     ========================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Deactivate current tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      // Activate clicked tab
      button.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      activePanel.classList.add('active');
    });
  });

  /* ==========================================
     SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================
     STATS COUNTING ANIMATION
     ========================================== */
  const statValues = document.querySelectorAll('.stat-value');
  
  const animateStats = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const label = element.previousElementSibling.firstElementChild.textContent;
    let start = 0;
    let duration = 1500; // ms
    let stepTime = 30; // ms
    let steps = duration / stepTime;
    let currentStep = 0;
    
    // Custom start and logic depending on rank
    if (label.includes("World")) {
      // For World Rank: Count down from 92 to 48 (which is an improvement!)
      start = 92;
      const diff = target - start;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        // Ease out quadratic
        const val = Math.round(start + diff * (1 - Math.pow(1 - progress, 2)));
        element.textContent = `#${val}`;
        
        if (currentStep >= steps) {
          element.textContent = `#${target}`;
          clearInterval(timer);
        }
      }, stepTime);
    } else if (label.includes("State")) {
      // For State Rank: Count down from 5 to 1
      start = 5;
      const diff = target - start;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const val = Math.round(start + diff * progress);
        element.textContent = `#${val}`;
        
        if (currentStep >= steps) {
          element.textContent = `#${target}`;
          clearInterval(timer);
        }
      }, stepTime);
    } else if (label.includes("Youth")) {
      // For Youth Rank: Count down from 10 to 3
      start = 10;
      const diff = target - start;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const val = Math.round(start + diff * progress);
        element.textContent = `#${val}`;
        
        if (currentStep >= steps) {
          element.textContent = `#${target}`;
          clearInterval(timer);
        }
      }, stepTime);
    }
  };

  // Observer for stats section
  const statsSection = document.querySelector('.hero-stats');
  let animated = false;
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        statValues.forEach(val => animateStats(val));
        animated = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});
