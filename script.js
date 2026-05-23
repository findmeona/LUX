// Smooth scroll enhancement + animations trigger

window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    } else {
      card.style.opacity = 0;
      card.style.transform = "translateY(50px)";
    }
  });
});

// initial animation setup
document.querySelectorAll(".card").forEach(card => {
  card.style.opacity = 0;
  card.style.transition = "0.6s ease";
  card.style.transform = "translateY(50px)";
});
