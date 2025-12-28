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
});

// Stronger 3D tilt with diagonal tracking
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotationX = (y - 0.5) * 18;   // increase depth here
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

                                                   // 100% working local unique visitor counter
const countElement = document.getElementById("visitor-count");

function updateCounter() {
  let visits = localStorage.getItem("site-visits");

  if (visits === null) { 
    visits = 1; 
    localStorage.setItem("site-visits", visits);
  } else {
    visits = parseInt(visits) + 1;
    localStorage.setItem("site-visits", visits);
  }

  countElement.textContent = visits;
}

updateCounter();
