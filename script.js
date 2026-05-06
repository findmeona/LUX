/* ===================================================
   RV CREATION – ENHANCED GALLERY JAVASCRIPT
   
   Features:
   - Filter tabs (category-based filtering with animation)
   - Lightbox modal with open/close transitions
   - Prev/Next navigation with swap animation
   - Related sub-gallery strip (2–3 images per item)
   - Keyboard navigation (←/→/Esc)
   - Touch/swipe support for mobile
   - Lazy image loading in modal
   - Click-outside-to-close on backdrop
   - Body scroll lock when modal open
   
   HOW TO USE:
   Add this script (or its contents) at the bottom of script.js,
   replacing the old gallery lightbox section (section 9).
=================================================== */

(function () {
  'use strict';

  /* ============================================================
     DATA – Related images per gallery item
     Map: data-index on .gallery-item → array of related images
     Each entry: { src, title, sub }
  ============================================================ */
  var RELATED = {
    0: [ // Chhab Setup
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTMkr0zCDKn1rAEF1GutUVkxVbkhyyT6T5A&s', title: '🌸 Shri Fal',     sub: 'Traditional Setup' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx41JlRFOQ4L0XAUUs1GfI4zAMYgu6NbLpSA&s', title: '🪷 Mandap',        sub: 'Wedding Décor' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhX_dqgnuXk4dG2qiTppnHaojL6UteIw2tJg&s', title: '📜 Lagna Lekhan',  sub: 'Invitation Ceremony' }
    ],
    1: [ // Shri Fal
      { src: 'images/chhab.jpg.jpeg',   title: '🌸 Chhab Setup',  sub: 'Traditional Decoration' },
      { src: 'images/vana.jpg.jpeg',    title: '🌿 Vana Rasam',   sub: 'Gujarati Ritual' },
      { src: 'images/kanku.jpg.jpeg',   title: '🪔 Kanku Pagla',  sub: 'Griha Pravesh' }
    ],
    2: [ // Vana Rasam
      { src: 'images/chhab.jpg.jpeg',   title: '🌸 Chhab Setup',  sub: 'Traditional Decoration' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTMkr0zCDKn1rAEF1GutUVkxVbkhyyT6T5A&s', title: '🌸 Shri Fal', sub: 'Traditional Setup' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx41JlRFOQ4L0XAUUs1GfI4zAMYgu6NbLpSA&s', title: '🪷 Mandap', sub: 'Wedding Décor' }
    ],
    3: [ // Wedding Mandap (wide)
      { src: 'images/vana.jpg.jpeg',    title: '🌿 Vana Rasam',   sub: 'Gujarati Ritual' },
      { src: 'images/chhab.jpg.jpeg',   title: '🌸 Chhab Setup',  sub: 'Traditional Decoration' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhX_dqgnuXk4dG2qiTppnHaojL6UteIw2tJg&s', title: '📜 Lagna Lekhan', sub: 'Invitation Ceremony' }
    ],
    4: [ // Chhathi
      { src: 'images/welcome.jpg.jpeg', title: '🪔 Welcome Baby', sub: 'Baby Ceremony' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31s-v8TSOyrNlxmoK62TWJDYksJfMDGR5OQ&s', title: '🪔 Chunni Rent', sub: 'Décor Accessories' },
      { src: 'images/kanku.jpg.jpeg',   title: '🪔 Kanku Pagla',  sub: 'Griha Pravesh' }
    ],
    5: [ // Lagna Lekhan
      { src: 'images/chhab.jpg.jpeg',   title: '🌸 Chhab Setup',  sub: 'Traditional Decoration' },
      { src: 'images/vana.jpg.jpeg',    title: '🌿 Vana Rasam',   sub: 'Gujarati Ritual' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx41JlRFOQ4L0XAUUs1GfI4zAMYgu6NbLpSA&s', title: '🪷 Mandap', sub: 'Wedding Décor' }
    ],
    6: [ // Kanku Pagla
      { src: 'images/welcome.jpg.jpeg', title: '🪔 Welcome Baby', sub: 'Baby Ceremony' },
      { src: 'images/chhathi.jpg.jpeg', title: '🌙 Chhathi Décor', sub: 'Baby Ceremony' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31s-v8TSOyrNlxmoK62TWJDYksJfMDGR5OQ&s', title: '🪔 Chunni Rent', sub: 'Décor Accessories' }
    ],
    7: [ // Chunni Rent
      { src: 'images/chhab.jpg.jpeg',   title: '🌸 Chhab Setup',  sub: 'Traditional Decoration' },
      { src: 'images/kanku.jpg.jpeg',   title: '🪔 Kanku Pagla',  sub: 'Griha Pravesh' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTMkr0zCDKn1rAEF1GutUVkxVbkhyyT6T5A&s', title: '🌸 Shri Fal', sub: 'Traditional Setup' }
    ],
    8: [ // Welcome Baby
      { src: 'images/chhathi.jpg.jpeg', title: '🌙 Chhathi Décor', sub: 'Baby Ceremony' },
      { src: 'images/kanku.jpg.jpeg',   title: '🪔 Kanku Pagla',   sub: 'Griha Pravesh' },
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31s-v8TSOyrNlxmoK62TWJDYksJfMDGR5OQ&s', title: '🪔 Chunni Rent', sub: 'Décor Accessories' }
    ]
  };

  /* ============================================================
     DOM REFS
  ============================================================ */
  var modal         = document.getElementById('glModal');
  var backdrop      = document.getElementById('glBackdrop');
  var panel         = modal ? modal.querySelector('.gl-panel') : null;
  var closeBtn      = document.getElementById('glClose');
  var prevBtn       = document.getElementById('glPrev');
  var nextBtn       = document.getElementById('glNext');
  var mainImg       = document.getElementById('glMainImg');
  var loader        = document.getElementById('glLoader');
  var captionTitle  = document.getElementById('glCaptionTitle');
  var captionSub    = document.getElementById('glCaptionSub');
  var counter       = document.getElementById('glCounter');
  var relatedStrip  = document.getElementById('glRelatedStrip');
  var galleryItems  = Array.from(document.querySelectorAll('.gallery-grid .gallery-item'));

  /* State */
  var currentIndex   = 0;
  var visibleItems   = []; // tracks filtered visible items
  var swipeStartX    = 0;
  var swipeThreshold = 55;

  /* ============================================================
     FILTER TABS
  ============================================================ */
  var filterBtns = document.querySelectorAll('.gf-btn');

  function filterGallery(category) {
    galleryItems.forEach(function (item) {
      var cat = item.getAttribute('data-category');
      var show = category === 'all' || cat === category;

      if (show) {
        item.classList.remove('hidden');
        item.style.position = '';
        item.style.visibility = '';
      } else {
        item.classList.add('hidden');
      }
    });

    // Rebuild visible list for lightbox navigation
    buildVisibleList();
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filterGallery(btn.getAttribute('data-filter'));
    });
  });

  function buildVisibleList() {
    visibleItems = galleryItems.filter(function (item) {
      return !item.classList.contains('hidden');
    });
  }

  buildVisibleList();

  /* ============================================================
     LIGHTBOX OPEN / CLOSE
  ============================================================ */
  function openModal(itemEl) {
    if (!modal || !itemEl) return;

    var idx = parseInt(itemEl.getAttribute('data-index'), 10);
    currentIndex = visibleItems.indexOf(itemEl);

    // Click flash on item
    var box = itemEl.querySelector('.gallery-box');
    if (box) {
      box.classList.add('clicked');
      setTimeout(function () { box.classList.remove('clicked'); }, 450);
    }

    // Show modal
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Animate in (next tick so transition fires)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        modal.classList.add('is-open');
      });
    });

    // Load content
    populateModal(itemEl, idx);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';

    // After transition ends, hide properly
    setTimeout(function () {
      modal.setAttribute('hidden', '');
      mainImg.src = '';
      relatedStrip.innerHTML = '';
    }, 460);
  }

  /* ============================================================
     POPULATE MODAL with current item
  ============================================================ */
  function populateModal(itemEl, dataIdx) {
    var img      = itemEl.querySelector('img');
    var textEl   = itemEl.querySelector('.gallery-text span');
    var subEl    = itemEl.querySelector('.gallery-text small');

    var src      = img ? img.src : '';
    var title    = textEl ? textEl.textContent : '';
    var sub      = subEl  ? subEl.textContent  : '';
    var total    = visibleItems.length;
    var position = visibleItems.indexOf(itemEl) + 1;

    loadMainImage(src);
    captionTitle.textContent = title;
    captionSub.textContent   = sub;
    counter.textContent      = position + ' / ' + total;

    buildRelated(dataIdx !== undefined ? dataIdx : parseInt(itemEl.getAttribute('data-index'), 10));
  }

  /* ---- Lazy-load main image ---- */
  function loadMainImage(src) {
    loader.classList.add('active');
    mainImg.style.opacity = '0';

    var tmpImg = new Image();
    tmpImg.onload = function () {
      mainImg.src = src;
      mainImg.style.opacity = '1';
      loader.classList.remove('active');
    };
    tmpImg.onerror = function () {
      mainImg.src = src; // show anyway
      mainImg.style.opacity = '1';
      loader.classList.remove('active');
    };
    tmpImg.src = src;
  }

  /* ---- Animated swap (prev/next) ---- */
  function swapImage(newItemEl) {
    var direction = arguments[1] || 'next'; // 'prev' | 'next'

    // Leave animation
    mainImg.classList.add('leaving');
    if (direction === 'prev') {
      mainImg.style.transform = 'scale(0.93) translateX(20px)';
    } else {
      mainImg.style.transform = 'scale(0.93) translateX(-20px)';
    }

    setTimeout(function () {
      mainImg.classList.remove('leaving');
      mainImg.style.transform = '';

      var dataIdx = parseInt(newItemEl.getAttribute('data-index'), 10);
      populateModal(newItemEl, dataIdx);

      // Enter animation
      mainImg.style.opacity = '0';
      mainImg.style.transform = direction === 'prev'
        ? 'scale(0.95) translateX(-20px)'
        : 'scale(0.95) translateX(20px)';

      requestAnimationFrame(function () {
        mainImg.style.transition = 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)';
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1) translateX(0)';

        setTimeout(function () {
          mainImg.style.transition = '';
        }, 460);
      });
    }, 230);
  }

  /* ---- Build related thumbnails ---- */
  function buildRelated(dataIdx) {
    relatedStrip.innerHTML = '';
    var related = RELATED[dataIdx];
    if (!related || related.length === 0) {
      document.getElementById('glRelated').style.display = 'none';
      return;
    }

    document.getElementById('glRelated').style.display = '';

    related.forEach(function (rel, i) {
      var thumb = document.createElement('div');
      thumb.className = 'gl-thumb';
      thumb.setAttribute('title', rel.title);

      var tImg = document.createElement('img');
      tImg.src = rel.src;
      tImg.alt = rel.title;
      tImg.loading = 'lazy';

      thumb.appendChild(tImg);
      relatedStrip.appendChild(thumb);

      // Click thumbnail → set as main
      thumb.addEventListener('click', function () {
        document.querySelectorAll('.gl-thumb').forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');

        loadMainImage(rel.src);
        captionTitle.textContent = rel.title;
        captionSub.textContent   = rel.sub;
        counter.textContent      = '· · ·';
      });
    });
  }

  /* ============================================================
     NAVIGATION – prev / next
  ============================================================ */
  function navigateTo(direction) {
    if (visibleItems.length < 2) return;

    var newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % visibleItems.length;
    } else {
      newIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    }

    currentIndex = newIndex;
    swapImage(visibleItems[currentIndex], direction);
  }

  /* ============================================================
     EVENT LISTENERS
  ============================================================ */

  /* Open modal on gallery-box click */
  galleryItems.forEach(function (item) {
    var box = item.querySelector('.gallery-box');
    if (!box) return;

    box.addEventListener('click', function () {
      openModal(item);
    });

    /* Keyboard: Enter / Space */
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  /* Close button */
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  /* Backdrop click */
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  /* Prev / Next */
  if (prevBtn) {
    prevBtn.addEventListener('click', function () { navigateTo('prev'); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () { navigateTo('next'); });
  }

  /* Keyboard navigation */
  document.addEventListener('keydown', function (e) {
    if (!modal || modal.hasAttribute('hidden')) return;

    if (e.key === 'Escape')     { closeModal(); }
    if (e.key === 'ArrowRight') { navigateTo('next'); }
    if (e.key === 'ArrowLeft')  { navigateTo('prev'); }
  });

  /* Touch / swipe support */
  if (panel) {
    panel.addEventListener('touchstart', function (e) {
      swipeStartX = e.touches[0].clientX;
    }, { passive: true });

    panel.addEventListener('touchend', function (e) {
      var deltaX = e.changedTouches[0].clientX - swipeStartX;
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX < 0) { navigateTo('next'); }
        else            { navigateTo('prev'); }
      }
    }, { passive: true });
  }

  /* ============================================================
     REMOVE OLD LIGHTBOX GLOBAL FUNCTIONS
     (so old onclick="openLightbox()" doesn't conflict)
     Keep them as no-ops if other code still calls them.
  ============================================================ */
  window.openLightbox  = function () { /* superseded by new modal */ };
  window.closeLightbox = function () { closeModal(); };

})();
/* ============================================================
   END OF ENHANCED GALLERY SCRIPT
============================================================ */
