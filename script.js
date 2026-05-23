window.addEventListener("load",()=>{

  document.querySelector(".loader").style.display="none";

});

const menuBtn=document.querySelector(".menu-btn");

const navLinks=document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

  navLinks.classList.toggle("active");

});

AOS.init({

  duration:1200,
  once:true

});
