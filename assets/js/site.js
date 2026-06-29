document.documentElement.classList.add("js");

const menuButton = document.querySelector("[data-menu-toggle]");
const siteNavigation = document.querySelector("[data-site-nav]");

if (menuButton && siteNavigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNavigation.dataset.open = String(!isOpen);
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      siteNavigation.dataset.open = "false";
    }
  });
}
