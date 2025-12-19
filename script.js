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

function updateActiveNav(page) {
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.remove("active");
    if (a.dataset.route === page) {
      a.classList.add("active");
    }
  });
}

function showPage(page) {
  updateActiveNav(page);

  if (page === "achievements") {
    home.style.display = "none";
    achievements.style.display = "block";
  } else {
    achievements.style.display = "none";
    home.style.display = "block";
  }
}
const blog = document.getElementById("page-blog");

function showPage(page) {
  updateActiveNav(page);

  home.style.display = "none";
  achievements.style.display = "none";
  blog.style.display = "none";

  if (page === "achievements") achievements.style.display = "block";
  else if (page === "blog") blog.style.display = "block";
  else home.style.display = "block";
}

// Blog post toggle
document.querySelectorAll(".read-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".blog-list").style.display = "none";
    document.querySelector("#post-1").classList.remove("hidden");
  };
});

document.querySelectorAll(".back-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelector("#post-1").classList.add("hidden");
    document.querySelector(".blog-list").style.display = "flex";
  };
});

// Handle direct /blog
if (location.pathname === "/blog") {
  showPage("blog");
}


