const items = document.querySelectorAll('.item');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

let currentImages = [];
let currentIndex = 0;

// ===== OPEN MINI GALLERY =====
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', (e) => {

    // always get parent item (fix click issue)
    const parent = e.currentTarget;

    const imagesAttr = parent.getAttribute('data-images');

    if (!imagesAttr) {
      console.error("No data-images found");
      return;
    }

    // split + clean
    currentImages = imagesAttr.split(',').map(img => img.trim());

    currentIndex = 0;

    // DEBUG (remove later)
    console.log("Opened images:", currentImages);

    modal.hidden = false;
    modalImg.src = currentImages[currentIndex];
  });
});


// ===== CHANGE IMAGE =====
function showImage(index) {
  if (!currentImages.length) return;

  currentIndex = (index + currentImages.length) % currentImages.length;

  modalImg.style.opacity = 0;

  setTimeout(() => {
    modalImg.src = currentImages[currentIndex];
    modalImg.style.opacity = 1;
  }, 200);
}


// NAV
document.getElementById('next').onclick = () => showImage(currentIndex + 1);
document.getElementById('prev').onclick = () => showImage(currentIndex - 1);
document.getElementById('close').onclick = () => modal.hidden = true;
document.querySelector('.backdrop').onclick = () => modal.hidden = true;


// ===== SWIPE =====
let startX = 0;

modal.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

modal.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) showImage(currentIndex + 1);
  if (endX - startX > 50) showImage(currentIndex - 1);
});
