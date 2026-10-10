document.documentElement.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Menü (mobil): Button, Escape, Klick außerhalb, Fokusverlust
const menuButton = document.querySelector("[data-menu-toggle]");
const siteNavigation = document.querySelector("[data-site-nav]");

if (menuButton && siteNavigation) {
  const isOpen = () => menuButton.getAttribute("aria-expanded") === "true";
  const setOpen = (open, returnFocus = false) => {
    menuButton.setAttribute("aria-expanded", String(open));
    siteNavigation.dataset.open = String(open);
    if (!open && returnFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => setOpen(!isOpen()));
  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false, true);
    }
  });
  document.addEventListener("click", (event) => {
    if (isOpen() && !siteNavigation.contains(event.target) && !menuButton.contains(event.target)) {
      setOpen(false);
    }
  });
  siteNavigation.addEventListener("focusout", (event) => {
    if (isOpen() && event.relatedTarget && !siteNavigation.contains(event.relatedTarget) && event.relatedTarget !== menuButton) {
      setOpen(false);
    }
  });
}

// Suche und Themenfilter (FAQ und Begriffe)
document.querySelectorAll("[data-filter-root]").forEach((root) => {
  const search = root.querySelector("[data-filter-search]");
  const buttons = Array.from(root.querySelectorAll("[data-filter]"));
  const items = Array.from(document.querySelectorAll("[data-filter-item]"));
  const groups = Array.from(document.querySelectorAll("[data-filter-group]"));
  const status = root.querySelector("[data-filter-status]");
  const singular = root.dataset.singular || "Eintrag";
  const plural = root.dataset.plural || "Einträge";
  let category = "alle";

  const apply = () => {
    const query = (search ? search.value : "").trim().toLowerCase();
    let visible = 0;
    items.forEach((item) => {
      const matchesCategory = category === "alle" || item.dataset.category === category;
      const haystack = `${item.textContent} ${item.dataset.keywords || ""}`.toLowerCase();
      const show = matchesCategory && (!query || haystack.includes(query));
      item.hidden = !show;
      if (show) {
        visible += 1;
      }
    });
    groups.forEach((group) => {
      group.hidden = !group.querySelector("[data-filter-item]:not([hidden])");
    });
    if (status) {
      status.textContent = visible === 0
        ? `Kein ${singular} passt zu dieser Auswahl.`
        : `${visible} ${visible === 1 ? singular : plural} angezeigt.`;
    }
  };

  const setCategory = (value) => {
    category = value;
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === value)));
    apply();
  };

  buttons.forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.filter)));
  if (search) {
    search.addEventListener("input", apply);
  }

  // Frühere Sprungmarken (#faq-betreuung usw.) wählen den passenden Filter.
  const fromHash = window.location.hash.replace(/^#faq-/, "");
  setCategory(buttons.some((button) => button.dataset.filter === fromHash) ? fromHash : "alle");
});

// Inhaltsverzeichnis: aktuellen Abschnitt markieren
const tocLinks = Array.from(document.querySelectorAll(".toc a[href^='#']"));
if (tocLinks.length && "IntersectionObserver" in window) {
  const targets = tocLinks.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      tocLinks.forEach((link) => {
        if (link.hash.slice(1) === entry.target.id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-15% 0px -75% 0px" });
  targets.forEach((target) => observer.observe(target));
}

// Rechtstexte mobil: Abschnitte aufklappbar (Suche im Browser öffnet sie)
const collapsible = document.querySelector("[data-collapse]");
const compact = window.matchMedia("(max-width: 720px)");
if (collapsible) {
  const hiddenValue = "onbeforematch" in document.body ? "until-found" : "";
  const byChapter = collapsible.dataset.collapse === "chapters";
  const headings = byChapter
    ? Array.from(collapsible.querySelectorAll(":scope > .chapter > h2")).filter((h) => h.parentElement.id !== "weiter")
    : Array.from(collapsible.querySelectorAll(":scope > h2[id]"));
  const sections = headings.map((heading) => {
    const items = [];
    let next = heading.nextElementSibling;
    while (next && next.tagName !== "H2") {
      items.push(next);
      next = next.nextElementSibling;
    }
    return { heading, items, button: null };
  });

  const setOpen = (section, open) => {
    section.button.setAttribute("aria-expanded", String(open));
    section.items.forEach((item) => {
      if (open) {
        item.removeAttribute("hidden");
      } else {
        item.setAttribute("hidden", hiddenValue);
      }
    });
  };

  const enable = () => sections.forEach((section) => {
    if (section.button) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "collapse-toggle";
    while (section.heading.firstChild) {
      button.append(section.heading.firstChild);
    }
    section.heading.append(button);
    section.button = button;
    button.addEventListener("click", () => setOpen(section, button.getAttribute("aria-expanded") !== "true"));
    section.items.forEach((item) => item.addEventListener("beforematch", () => setOpen(section, true)));
    setOpen(section, false);
  });

  const disable = () => sections.forEach((section) => {
    if (!section.button) {
      return;
    }
    while (section.button.firstChild) {
      section.heading.append(section.button.firstChild);
    }
    section.button.remove();
    section.button = null;
    section.items.forEach((item) => item.removeAttribute("hidden"));
  });

  const openFor = (target) => {
    const section = target && sections.find((entry) => entry.heading === target || entry.heading.parentElement === target || entry.items.some((item) => item.contains(target)));
    if (section && section.button) {
      setOpen(section, true);
    }
  };

  const sync = () => {
    if (compact.matches) {
      enable();
      openFor(document.getElementById(decodeURIComponent(window.location.hash.slice(1))));
    } else {
      disable();
    }
  };
  sync();
  compact.addEventListener("change", sync);
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (link) {
      openFor(document.getElementById(decodeURIComponent(link.hash.slice(1))));
    }
  });
}

// „Nach oben“ ab zwei Bildschirmhöhen
const backToTop = document.createElement("button");
backToTop.type = "button";
backToTop.className = "back-to-top";
backToTop.hidden = true;
backToTop.innerHTML = '<span aria-hidden="true">↑</span><span>Nach oben</span>';
document.body.append(backToTop);
let ticking = false;
const updateBackToTop = () => {
  backToTop.hidden = window.scrollY < window.innerHeight * 2;
  ticking = false;
};
window.addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateBackToTop);
  }
}, { passive: true });
updateBackToTop();
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  const brand = document.querySelector(".wordmark");
  if (brand) {
    brand.focus({ preventScroll: true });
  }
});
