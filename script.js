const highlightsOverlay = document.getElementById("highlightsOverlay");
const closeOverlay = document.querySelector(".overlay-close");

document
  .querySelector("[data-open-highlights]")
  ?.addEventListener("click", () => {
    highlightsOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

closeOverlay.addEventListener("click", () => {
  highlightsOverlay.classList.add("hidden");
  document.body.style.overflow = "";
});
