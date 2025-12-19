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
   STAR GENERATION
================================ */

function createStars() {
  const count = Math.min(300, Math.floor((w * h) / 6000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
    t: Math.random() * Math.PI * 2,
    s: Math.random() * 0.002 + 0.001
  }));
}

/* ===============================
   RENDER LOOP
================================ */

function draw() {
  if (!running) return;

  ctx.clearRect(0, 0, w, h);

  for (const star of stars) {
    star.t += star.s;
    const alpha = 0.4 + Math.sin(star.t) * 0.3 + star.a * 0.3;

    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }

  rafId = requestAnimationFrame(draw);
}

/* ===============================
   DARK MODE CONTROL
================================ */

function startStars() {
  if (running) return;
  running = true;
  createStars();
  draw();
}

function stopStars() {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
  ctx.clearRect(0, 0, w, h);
}

/* Observe dark mode changes */
const observer = new MutationObserver(() => {
  document.body.classList.contains("dark")
    ? startStars()
    : stopStars();
});

observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

/* Initial state */
if (document.body.classList.contains("dark")) {
  startStars();
}





