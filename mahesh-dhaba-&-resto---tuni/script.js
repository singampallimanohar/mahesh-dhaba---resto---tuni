/**
 * Mahesh Dhaba & Resto - Vanilla JavaScript Suite
 * Tuni, Andhra Pradesh, India
 * Clean, lightweight, modular frontend script
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Sticky Header & Back-to-Top Observer
     ------------------------------------------------------------------------ */
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScrollEvents = () => {
    const scrollY = window.scrollY;

    // Header sticky shadow
    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScrollEvents, { passive: true });
  handleScrollEvents();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Drawer
     ------------------------------------------------------------------------ */
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileMenu = () => {
    if (!mobileNav || !mobileBackdrop) return;
    mobileNav.classList.add('is-open');
    mobileBackdrop.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!mobileNav || !mobileBackdrop) return;
    mobileNav.classList.remove('is-open');
    mobileBackdrop.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', openMobileMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* ------------------------------------------------------------------------
     3. Smooth Scrolling with Fixed Header Compensation
     ------------------------------------------------------------------------ */
  const internalNavLinks = document.querySelectorAll('a[href^="#"]');

  internalNavLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. Scroll-Spy Active Navigation Link
     ------------------------------------------------------------------------ */
  const navSections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 120;

    navSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ------------------------------------------------------------------------
     5. Digital Menu Category Filtering
     ------------------------------------------------------------------------ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Toggle active states
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const selectedCategory = tab.getAttribute('data-category');

      // Filter cards
      menuCards.forEach((card) => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (selectedCategory === 'all' || cardCategories.includes(selectedCategory)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.98)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. Quick Enquire & WhatsApp Dish Links
     ------------------------------------------------------------------------ */
  const dishEnquireButtons = document.querySelectorAll('.signature-enquire-btn, .menu-enquire-btn');
  const defaultPhone = '918309050943';

  dishEnquireButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dishName = btn.getAttribute('data-dish') || 'delicious food';
      const encodedMsg = encodeURIComponent(
        `Hello Mahesh Dhaba & Resto (Tuni), I would like to enquire about ordering: ${dishName}. Please share availability and details.`
      );
      const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });

  /* ------------------------------------------------------------------------
     7. Full Menu Modal
     ------------------------------------------------------------------------ */
  const openFullMenuBtn = document.getElementById('open-full-menu-btn');
  const fullMenuModal = document.getElementById('full-menu-modal');
  const fullMenuCloseBtn = document.getElementById('full-menu-close');
  const modalCloseAction = document.getElementById('modal-close-action');
  const fullMenuBackdrop = fullMenuModal ? fullMenuModal.querySelector('.full-menu-backdrop') : null;

  const showFullMenu = () => {
    if (!fullMenuModal) return;
    fullMenuModal.style.display = 'flex';
    fullMenuModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const hideFullMenu = () => {
    if (!fullMenuModal) return;
    fullMenuModal.style.display = 'none';
    fullMenuModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openFullMenuBtn) openFullMenuBtn.addEventListener('click', showFullMenu);
  if (fullMenuCloseBtn) fullMenuCloseBtn.addEventListener('click', hideFullMenu);
  if (modalCloseAction) modalCloseAction.addEventListener('click', hideFullMenu);
  if (fullMenuBackdrop) fullMenuBackdrop.addEventListener('click', hideFullMenu);

  /* ------------------------------------------------------------------------
     8. Gallery Lightbox with Prev / Next Navigation
     ------------------------------------------------------------------------ */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxBackdrop = lightboxModal ? lightboxModal.querySelector('.lightbox-backdrop') : null;

  let currentGalleryIndex = 0;
  const galleryItems = [];

  galleryCards.forEach((card, index) => {
    const src = card.getAttribute('data-src');
    const caption = card.getAttribute('data-caption') || '';
    galleryItems.push({ src, caption });

    card.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  const openLightbox = (index) => {
    if (!lightboxModal || !galleryItems[index]) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightboxModal.style.display = 'flex';
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const updateLightboxContent = () => {
    const item = galleryItems[currentGalleryIndex];
    if (lightboxImg && item) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.caption;
    }
    if (lightboxCaption && item) {
      lightboxCaption.textContent = item.caption;
    }
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.style.display = 'none';
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showNextImage = () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateLightboxContent();
  };

  const showPrevImage = () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Keyboard navigation for Lightbox and Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      hideFullMenu();
      closeMobileMenu();
    } else if (lightboxModal && lightboxModal.style.display === 'flex') {
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });

  /* ------------------------------------------------------------------------
     9. Contact Form Frontend Validation
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const phoneInput = document.getElementById('user-phone');
  const messageInput = document.getElementById('user-message');

  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const messageError = document.getElementById('message-error');
  const formStatusAlert = document.getElementById('form-status-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        if (nameInput) nameInput.classList.add('error');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      } else {
        if (nameInput) nameInput.classList.remove('error');
        if (nameError) nameError.classList.remove('visible');
      }

      // Validate Phone (Indian phone format digits)
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const phonePattern = /^[\d\s+\-()]{8,15}$/;
      if (!phoneVal || !phonePattern.test(phoneVal)) {
        if (phoneInput) phoneInput.classList.add('error');
        if (phoneError) phoneError.classList.add('visible');
        isValid = false;
      } else {
        if (phoneInput) phoneInput.classList.remove('error');
        if (phoneError) phoneError.classList.remove('visible');
      }

      // Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 4) {
        if (messageInput) messageInput.classList.add('error');
        if (messageError) messageError.classList.add('visible');
        isValid = false;
      } else {
        if (messageInput) messageInput.classList.remove('error');
        if (messageError) messageError.classList.remove('visible');
      }

      if (!isValid) return;

      // Simulated success feedback
      if (formStatusAlert) {
        formStatusAlert.className = 'form-status-alert success';
        formStatusAlert.style.display = 'block';
        formStatusAlert.innerHTML = `
          <strong>Thank you, ${nameVal}!</strong><br>
          Your dining enquiry has been recorded in this client preview demo.<br>
          <span style="font-size: 0.8rem; opacity: 0.9;">
            For urgent parcels or orders, contact Mahesh Dhaba & Resto directly at <strong>083090 50943</strong> or via WhatsApp.
          </span>
        `;
      }

      // Clear fields
      contactForm.reset();

      // Auto scroll slightly to ensure message is viewed
      setTimeout(() => {
        formStatusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });

    // Clear errors on input
    [nameInput, phoneInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          const errorId = `${input.id.replace('user-', '')}-error`;
          const errEl = document.getElementById(errorId);
          if (errEl) errEl.classList.remove('visible');
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. Scroll Reveal Animation via IntersectionObserver
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach((el) => {
      el.classList.add('is-revealed');
    });
  }
});
