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
