/* ===============================
   DARK MODE TOGGLE
================================ */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
  };
}

/* ===============================
   TAGLINE TYPEWRITER
================================ */

const typeEl = document.getElementById("typewriter");
const taglineText = "Student • Space & Tech Enthusiast";
let ti = 0;

if (typeEl) {
  typeEl.textContent = "";

  function typeTagline() {
    if (ti < taglineText.length) {
      typeEl.textContent += taglineText.charAt(ti);
      ti++;
      setTimeout(typeTagline, 60);
    }
  }

  typeTagline();
}

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
   STAR CANVAS (DARK MODE ONLY)
================================ */

const canvas = document.getElementById("starCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;
  let stars = [];
  let running = false;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function createStars() {
    const count = Math.min(250, Math.floor((w * h) / 6000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random(),
      t: Math.random() * Math.PI * 2,
      s: Math.random() * 0.002 + 0.001
    }));
  }

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

    requestAnimationFrame(draw);
  }

  function startStars() {
    if (running) return;
    running = true;
    createStars();
    draw();
  }

  function stopStars() {
    running = false;
    ctx.clearRect(0, 0, w, h);
  }

  const observer = new MutationObserver(() => {
    document.body.classList.contains("dark")
      ? startStars()
      : stopStars();
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });

  if (document.body.classList.contains("dark")) {
    startStars();
  }
}
