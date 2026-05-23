window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
});

// smooth load animation
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s ease";
  });
});
