// Loader

window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
});

// AOS Init

AOS.init({
  duration: 1200,
  once: true
});

// Navbar Scroll Effect

window.addEventListener("scroll", () => {

  const header = document.querySelector("header");

  if(window.scrollY > 50){
    header.style.background = "rgba(0,0,0,0.85)";
  } else {
    header.style.background = "rgba(0,0,0,0.4)";
  }

});

// Mouse Move Animation

document.addEventListener("mousemove", (e) => {

  const cards = document.querySelectorAll(".floating-card");

  cards.forEach((card, index) => {

    let speed = (index + 1) * 0.01;

    let x = (window.innerWidth - e.pageX * speed) / 100;
    let y = (window.innerHeight - e.pageY * speed) / 100;

    card.style.transform = `translate(${x}px, ${y}px)`;

  });

});
