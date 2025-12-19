const home = document.getElementById("page-home");
const achievements = document.getElementById("page-achievements");

function show(route, push = true) {
  if (route === "achievements") {
    home.classList.add("hidden");
    achievements.classList.remove("hidden");
    if (push) history.pushState({}, "", "/achievements");
  } else {
    achievements.classList.add("hidden");
    home.classList.remove("hidden");
    if (push) history.pushState({}, "", "/");
  }
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  if (!link) return;
  e.preventDefault();
  show(link.dataset.route);
});

window.addEventListener("popstate", () => {
  show(location.pathname === "/achievements" ? "achievements" : "home", false);
});

show(location.pathname === "/achievements" ? "achievements" : "home", false);

const navToggle = document.querySelector(".nav-toggle");
const navMobile = document.querySelector(".nav-mobile");

navToggle.addEventListener("click", () => {
  navMobile.classList.toggle("active");
});

// Close menu when a link is clicked (UX polish)
navMobile.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMobile.classList.remove("active");
  });
});
