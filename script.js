/* ===============================
   PAGE ROUTING (SPA)
================================ */

const home = document.getElementById("page-home");
const achievements = document.getElementById("page-achievements");
const blog = document.getElementById("page-blog");

function updateActiveNav(page) {
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.dataset.route === page);
  });
}

function showPage(page, push = true) {
  home.style.display = "none";
  achievements.style.display = "none";
  blog.style.display = "none";

  if (page === "achievements") achievements.style.display = "block";
  else if (page === "blog") blog.style.display = "block";
  else home.style.display = "block";

  updateActiveNav(page);

  if (push) {
    history.pushState({}, "", page === "home" ? "/" : "/" + page);
  }

  document.title =
    page === "achievements" ? "Achievements — Hridhaan Sahay" :
    page === "blog" ? "Blog — Hridhaan Sahay" :
    "Hridhaan Sahay — Portfolio";
}

// Nav routing
document.querySelectorAll("[data-route]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    showPage(el.dataset.route);
  });
});

// Browser back / forward
window.addEventListener("popstate", () => {
  const page = location.pathname.replace("/", "") || "home";
  showPage(page, false);
});

// Initial load
const initialPage = location.pathname.replace("/", "") || "home";
showPage(initialPage, false);


/* ===============================
   BLOG READ MODE
================================ */

document.querySelectorAll("#page-blog .read-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".blog-list").style.display = "none";
    document.getElementById("post-1").classList.remove("hidden");
  });
});


/* ===============================
   SECTION SCROLL (FROM ANY PAGE)
================================ */

document.querySelectorAll("[data-section]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const section = link.dataset.section;

    showPage("home");

    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  });
});


/* ===============================
   MOBILE NAV
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (!navToggle || !navMobile) return;

  navToggle.addEventListener("click", e => {
    e.stopPropagation();
    navMobile.classList.toggle("open");
  });

  navMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("open");
    });
  });
});


/* ===============================
   PROJECT CARD 3D TILT
================================ */

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * 18;
    const rotateY = (0.5 - x) * 18;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  });
});


/* ===============================
   HERO TYPING LOOP
================================ */

const phrases = [
  "I like exploring space.",
  "I like writing clean code.",
  "I like building cool projects.",
  "I like competitive programming.",
  "I like learning something new."
];

const textEl = document.getElementById("typingText");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  textEl.textContent = phrase.slice(0, charIndex) || "\u00A0";

  if (!deleting) {
    charIndex++;
    if (charIndex > phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 500);
      return;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 80);
}

window.addEventListener("load", typeLoop);


/* ===============================
   NETFLIX INTRO
================================ */

window.addEventListener("load", () => {
  const intro = document.getElementById("netflix-intro");
  if (!intro) return;

  setTimeout(() => {
    intro.classList.add("active");
    setTimeout(() => intro.remove(), 1300);
  }, 800);
});


/* ===============================
   ROUGH NOTATION (ABOUT SECTION)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof RoughNotation === "undefined") return;

  const yellowEl = document.getElementById("draw-space");
  const redEl = document.getElementById("draw-connect");
  const youtubeEl = document.getElementById("draw-youtube");

  if (!yellowEl || !redEl) return;

  const yellowDraw = RoughNotation.annotate(yellowEl, {
    type: "highlight",
    color: "#fff000",
    padding: [2, 4],
    animationDuration: 1000,
    multiline: true,
    strokeWidth: 2
  });

  const redDraw = RoughNotation.annotate(redEl, {
    type: "underline",
    color: "#ff4d4d",
    padding: 2,
    strokeWidth: 2.5,
    iterations: 3,
    animationDuration: 800
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => yellowDraw.show(), 600);
        setTimeout(() => redDraw.show(), 1600);
        observer.disconnect();
      }
    });
  }, { threshold: 0.8 });

  observer.observe(yellowEl);
});
