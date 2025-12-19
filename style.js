/* ===============================
   DARK MODE
================================ */

const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.onclick = () => {
    document.body.classList.toggle("dark");
  };
}

/* ===============================
   FORCE TAGLINE TYPEWRITER
================================ */

(function forceTagline() {
  const TEXT = "Student • Space & Tech Enthusiast";
  const SPEED = 60;

  function start() {
    const el = document.getElementById("typewriter");
    if (!el) return;

    el.textContent = "";
    let i = 0;

    function type() {
      if (i < TEXT.length) {
        el.textContent += TEXT.charAt(i++);
        setTimeout(type, SPEED);
      }
    }

    type();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // override any other script
  setTimeout(start, 300);
})();

/* ===============================
   MOBILE NAV
================================ */

const navToggle = document.querySelector(".nav-toggle");
const navMobile = document.querySelector(".nav-mobile");

if (navToggle && navMobile) {
  navToggle.onclick = () => {
    navMobile.classList.toggle("open");
  };

  navMobile.querySelectorAll("a").forEach(link => {
    link.onclick = () => navMobile.classList.remove("open");
  });
}

/* ===============================
   STAR CANVAS (SAFE INIT)
================================ */

const canvas = document.getElementById("starCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random() * 0.6 + 0.2
  }));

  function draw() {
    if (!document.body.classList.contains("dark")) return;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fff";

    for (const s of stars) {
      ctx.globalAlpha = s.a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();
}
