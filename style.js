/* DARK MODE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
};

/* TYPEWRITER */
const text = "Student • Builder • Space & Tech";
let i = 0;
const speed = 60;

function type() {
  if (i < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(i);
    i++;
    setTimeout(type, speed);
  }
}
type();


// Hero name typing effect (safe)

  let j = 0;
  function typeHero() {
    if (j < heroText.length) {
      heroEl.textContent += heroText.charAt(j);
      j++;
      setTimeout(typeHero, 80);
    }
  }

  typeHero();
});


setTimeout(() => {
  document.querySelector(".hero-name")?.classList.add("finished");
}, 2000);

const navToggle = document.querySelector(".nav-toggle");
const navMobile = document.querySelector(".nav-mobile");

navToggle.onclick = () => {
  navMobile.classList.toggle("open");
};

/* Close on link click */
navMobile.querySelectorAll("a").forEach(link => {
  link.onclick = () => navMobile.classList.remove("open");
});




