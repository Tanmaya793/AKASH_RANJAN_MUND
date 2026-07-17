document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================
     STICKY NAVBAR & ACTIVE SCROLL
     ========================================== */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
  
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

  /* ==========================================
     CAREER RECORDS ACCORDION
     ========================================== */
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(acc => {
    const header = acc.querySelector('.record-card-header');
    header.addEventListener('click', () => {
      const isOpen = acc.classList.contains('expanded');
      
      // Close other accordions in the same panel
      const panel = acc.closest('.tab-panel');
      panel.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('expanded');
      });
      
      if (!isOpen) {
        acc.classList.add('expanded');
      }
    });
  });

  /* ==========================================
     DRIFT EMBERS CANVAS PARTICLES
     ========================================== */
  const canvas = document.getElementById('embersCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    
    // Handle resize
    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });
    
    const particles = [];
    const maxParticles = 40;
    
    class GoldParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.002 + 0.0005;
      }
      
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedX += Math.sin(this.y * 0.01) * 0.01;
        this.opacity -= this.fadeSpeed;
        
        if (this.opacity <= 0 || this.y < -10) {
          this.x = Math.random() * width;
          this.y = height + 10;
          this.size = Math.random() * 2 + 1;
          this.speedY = -(Math.random() * 0.4 + 0.1);
          this.speedX = Math.random() * 0.3 - 0.15;
          this.opacity = Math.random() * 0.5 + 0.2;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 184, 112, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    // Initialize
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new GoldParticle());
      particles[i].y = Math.random() * height;
    }
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ==========================================
     LIGHTBOX MODAL LOGIC
     ========================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (lightbox && lightboxImg && lightboxClose) {
    let currentGalleryImages = [];
    let currentGalleryIndex = 0;
    
    // Open Lightbox on Gallery Item Click
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImgElements = Array.from(galleryItems).map(item => item.querySelector('.gallery-img'));

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentGalleryImages = galleryImgElements.map(img => img.src);
        currentGalleryIndex = index;
        
        openLightbox(currentGalleryImages[currentGalleryIndex], galleryImgElements[currentGalleryIndex].alt);
        showNavButtons(true);
      });
    });

    // Open Lightbox on other page images (like Hero or Biography) when clicked!
    const clickableImages = document.querySelectorAll('.about-image, .press-clipping-image, .hero-split-image');
    clickableImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        currentGalleryImages = [img.src];
        currentGalleryIndex = 0;
        openLightbox(img.src, img.alt);
        showNavButtons(false);
      });
    });

    function openLightbox(src, caption) {
      lightbox.style.display = 'flex';
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
    }

    function showNavButtons(show) {
      if (prevBtn && nextBtn) {
        prevBtn.style.display = show ? 'block' : 'none';
        nextBtn.style.display = show ? 'block' : 'none';
      }
    }

    // Next / Prev Button click handlers
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentGalleryIndex > 0) {
          currentGalleryIndex--;
          openLightbox(currentGalleryImages[currentGalleryIndex], galleryImgElements[currentGalleryIndex].alt);
        }
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentGalleryIndex < currentGalleryImages.length - 1) {
          currentGalleryIndex++;
          openLightbox(currentGalleryImages[currentGalleryIndex], galleryImgElements[currentGalleryIndex].alt);
        }
      });
    }

    // Close Lightbox
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });

    // Keyboard support (Escape to close, left/right to navigate)
    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
          lightbox.style.display = 'none';
        } else if (e.key === 'ArrowLeft' && prevBtn && prevBtn.style.display !== 'none') {
          if (currentGalleryIndex > 0) {
            currentGalleryIndex--;
            openLightbox(currentGalleryImages[currentGalleryIndex], galleryImgElements[currentGalleryIndex].alt);
          }
        } else if (e.key === 'ArrowRight' && nextBtn && nextBtn.style.display !== 'none') {
          if (currentGalleryIndex < currentGalleryImages.length - 1) {
            currentGalleryIndex++;
            openLightbox(currentGalleryImages[currentGalleryIndex], galleryImgElements[currentGalleryIndex].alt);
          }
        }
      }
    });
  }

  /* ==========================================
     MOBILE RESPONSIVE SPONSOR MAIL REDIRECT
     ========================================== */
  const sponsorBtn = document.getElementById('sponsorBtn');
  if (sponsorBtn) {
    sponsorBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        window.location.href = 'mailto:akash.onelegeagle@gmail.com';
      }
    });
  }
});
