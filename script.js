const items = document.querySelectorAll('.item');
const buttons = document.querySelectorAll('.btn');

let filteredImages = [];
let currentIndex = 0;

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

// ===== FILTER =====
buttons.forEach(btn => {
  btn.onclick = () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    filteredImages = [];

    items.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        filteredImages.push(item.querySelector('img').src);
      } else {
        item.style.display = 'none';
      }
    });

    gsap.from(".item", {
      opacity: 0,
      y: 40,
      stagger: 0.1
    });
  };
});

// INIT
filteredImages = Array.from(items).map(i => i.querySelector('img').src);

// ===== OPEN MODAL =====
items.forEach((item, i) => {
  item.onclick = () => {
    currentIndex = i;
    modal.hidden = false;
    modalImg.src = filteredImages[currentIndex];

    gsap.from(".glass", { scale: 0.8, opacity: 0, duration: 0.4 });
  };
});

// ===== NAVIGATION =====
function showImage(index) {
  currentIndex = (index + filteredImages.length) % filteredImages.length;

  gsap.to("#modalImg", {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      modalImg.src = filteredImages[currentIndex];
      gsap.to("#modalImg", { opacity: 1 });
    }
  });
}

document.getElementById('next').onclick = () => showImage(currentIndex + 1);
document.getElementById('prev').onclick = () => showImage(currentIndex - 1);
document.getElementById('close').onclick = () => modal.hidden = true;

// ===== SWIPE (MOBILE + MOUSE) =====
let startX = 0;

modal.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

modal.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) showImage(currentIndex + 1);
  if (endX - startX > 50) showImage(currentIndex - 1);
});

// MOUSE DRAG
modal.addEventListener('mousedown', e => startX = e.clientX);

modal.addEventListener('mouseup', e => {
  let endX = e.clientX;

  if (startX - endX > 50) showImage(currentIndex + 1);
  if (endX - startX > 50) showImage(currentIndex - 1);
});
