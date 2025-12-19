/* DARK MODE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
};

/* TYPEWRITER */
const text = "Student • Space & Tech Enthusiast";
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

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let w, h, dpr;
let stars = [];
let running = false;
let rafId = null;

function resize() {
  dpr = window.devicePixelRatio || 1;
  w = window.innerWidth;
  h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener("resize", resize);

/* ===============================
   FORCE TAGLINE RESET (NUCLEAR)
   PLACE AT VERY BOTTOM
================================ */

(function forceTagline() {
  const TEXT = "Student • Space & Tech Enthusiast";
  const SPEED = 55;

  function start() {
    const el = document.getElementById("typewriter");
    if (!el) return;

    el.textContent = ""; // hard wipe

    let i = 0;
    function type() {
      if (i < TEXT.length) {
        el.textContent += TEXT.charAt(i++);
        setTimeout(type, SPEED);
      }
    }
    type();
  }

  // Run once DOM is stable
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // EXTRA FORCE: re-run after everything else finishes
  setTimeout(start, 300);
})();
</script>




