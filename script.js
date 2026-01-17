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

// Handle nav clicks
document.querySelectorAll("[data-route]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    showPage(el.dataset.route);
  });
});

// Handle back/forward
window.addEventListener("popstate", () => {
  const page = location.pathname.replace("/", "") || "home";
  showPage(page, false);
});

// Initial load
const initialPage = location.pathname.replace("/", "") || "home";
showPage(initialPage, false);

document.querySelectorAll("#page-blog .read-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".blog-list").style.display = "none";
    document.querySelector("#post-1").classList.remove("hidden");
  };
});

document.querySelectorAll("[data-section]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const section = link.dataset.section;

    // Always go to home first
    showPage("home");

    // Wait for DOM switch, then scroll
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth"
      });
    }, 50);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (!navToggle || !navMobile) return;

  navToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevents SPA click handlers from blocking
    navMobile.classList.toggle("open");
  });

  navMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("open");
    });
  });
});// Stronger 3D tilt with diagonal tracking
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotationX = (y - 0.5) * 18;
    const rotationY = (0.5 - x) * 18;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotationX}deg)
      rotateY(${rotationY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

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
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  
  // Determine what to display
  const displayText = currentPhrase.slice(0, charIndex);
  
  // Use &nbsp; or similar if empty to prevent height collapse
  textEl.textContent = displayText || "\u00A0"; 

  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000); // Pause at the end of a phrase
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 500); // Short pause before starting next word
      return;
    }
  }

  const speed = isDeleting ? 40 : 80;
  setTimeout(typeLoop, speed);
}

window.addEventListener("load", () => {
  typeLoop();
});


window.addEventListener("load", () => {
  const intro = document.getElementById("netflix-intro");
  if (!intro) return;

  setTimeout(() => {
    intro.classList.add("active");

    setTimeout(() => {
      intro.remove();
    }, 1300);
  }, 800);
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup Yellow Highlight
  const yellowTarget = document.querySelector('#yellow-highlight');
  const yellowNote = RoughNotation.annotate(yellowTarget, {
    type: 'highlight',
    color: '#fff000', // Bright Highlighter Yellow
    padding: [2, 4],
    iterations: 1,
    multiline: true,
    animationDuration: 800
  });

  // 2. Setup Red Underline
  const redTarget = document.querySelector('#red-underline');
  const redNote = RoughNotation.annotate(redTarget, {
    type: 'underline',
    color: '#ff4d4d', // Soft Red "Apple Pencil" color
    padding: 2,
    strokeWidth: 2,
    iterations: 2,
    animationDuration: 600
  });

  // 3. Trigger on Scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start Yellow animation
        setTimeout(() => yellowNote.show(), 400);
        
        // Start Red animation slightly after
        setTimeout(() => redNote.show(), 1200);
        
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.about'));
});
