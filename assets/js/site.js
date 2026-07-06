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

const faqSearch = document.querySelector("[data-faq-search]");
const faqFilters = document.querySelectorAll("[data-faq-filter]");
const faqItems = document.querySelectorAll("[data-faq-item]");
const faqStatus = document.querySelector("[data-faq-status]");
const faqCategories = document.querySelectorAll(".faq-category");

if (faqSearch && faqFilters.length && faqItems.length && faqStatus && faqCategories.length) {
  let activeCategory = "alle";

  const applyFaqFilter = () => {
    const query = faqSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const category = item.dataset.category || "";
      const haystack = `${item.textContent} ${item.dataset.keywords || ""}`.toLowerCase();
      const categoryMatches = activeCategory === "alle" || category === activeCategory;
      const queryMatches = !query || haystack.includes(query);
      const visible = categoryMatches && queryMatches;

      item.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });

    faqCategories.forEach((section) => {
      const hasVisibleItems = Array.from(section.querySelectorAll("[data-faq-item]")).some((item) => !item.hidden);
      section.hidden = !hasVisibleItems;
    });

    faqStatus.textContent = visibleCount > 0
      ? `${visibleCount} Frage${visibleCount === 1 ? "" : "n"} werden angezeigt.`
      : "Keine Frage passt zu dieser Auswahl.";
  };

  faqFilters.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.faqFilter || "alle";
      faqFilters.forEach((item) => item.classList.toggle("is-active", item === button));
      applyFaqFilter();
    });
  });

  faqSearch.addEventListener("input", applyFaqFilter);
  applyFaqFilter();
}

const glossarySearch = document.querySelector("[data-glossary-search]");
const glossaryItems = document.querySelectorAll("[data-glossary-item]");
const glossaryStatus = document.querySelector("[data-glossary-status]");

if (glossarySearch && glossaryItems.length && glossaryStatus) {
  const applyGlossaryFilter = () => {
    const query = glossarySearch.value.trim().toLowerCase();
    let visibleCount = 0;

    glossaryItems.forEach((item) => {
      const haystack = `${item.textContent} ${item.dataset.keywords || ""}`.toLowerCase();
      const visible = !query || haystack.includes(query);
      item.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });

    glossaryStatus.textContent = visibleCount > 0
      ? `${visibleCount} Begriff${visibleCount === 1 ? "" : "e"} werden angezeigt.`
      : "Kein Begriff passt zu dieser Suche.";
  };

  glossarySearch.addEventListener("input", applyGlossaryFilter);
  applyGlossaryFilter();
}

const pageName = window.location.pathname.split("/").pop() || "index.html";
const revealGroupsByPage = {
  "index.html": [
    { selector: '.home-situation[aria-labelledby="start-zielgruppen"] .task-card', stagger: true },
    { selector: ".home-summary .service-card", stagger: true },
    { selector: '.home-situation[aria-labelledby="start-abgrenzung"] > *', stagger: true },
    { selector: ".home-workflow .principle", stagger: true },
    { selector: ".home-region" },
    { selector: ".home-contact" },
  ],
  "leistungen.html": [
    { selector: ".services-overview-page .service-area", stagger: true },
    { selector: ".services-overview-page .services-boundary-section" },
  ],
  "ablauf-nach-bestellung.html": [
    { selector: ".process-steps .process-step", stagger: true },
  ],
  "fuer-betroffene-und-angehoerige.html": [
    { selector: ".audience-flow [data-editorial-number]", stagger: true },
  ],
  "was-ist-betreuung-und-was-nicht.html": [
    { selector: ".definition-principles .definition-principle", stagger: true },
    { selector: ".definition-limit-grid .definition-limit", stagger: true },
    { selector: ".emergency-orientation", fadeOnly: true },
  ],
  "verfahrenspflegschaft.html": [
    { selector: ".editorial-overview .summary-box" },
    { selector: ".editorial-content > .content-section", stagger: true },
  ],
  "rechtliche-betreuung.html": [
    { selector: ".legal-care-page .summary-box" },
    { selector: '.legal-care-page .content-section[aria-labelledby="typische-situationen"] .task-card', stagger: true },
    { selector: '.legal-care-page .content-section:not([aria-labelledby="typische-situationen"]):not(.legal-care-boundaries)', stagger: true },
    { selector: ".legal-care-page .legal-care-boundaries .boundary-card", stagger: true },
  ],
  "faq.html": [
    { selector: ".faq-tools" },
    { selector: ".faq-category", stagger: true, limit: 2 },
    { selector: ".faq-resources", stagger: true },
  ],
  "begriffe.html": [
    { selector: ".faq-tools" },
    { selector: "[data-glossary-list]" },
  ],
  "kontakt.html": [
    { selector: ".contact-direct > .contact-panel", stagger: true },
    { selector: ".contact-page > .short-answer" },
    { selector: ".contact-secondary > *", stagger: true },
    { selector: ".notice-grid .notice-card", stagger: true, fadeOnly: true },
  ],
  "fuer-behoerden-und-einrichtungen.html": [
    { selector: ".professional-page .task-card", stagger: true },
    { selector: '.professional-page .content-section[aria-labelledby="unterlagen-professionell"], .professional-page .content-section[aria-labelledby="erreichbarkeit-professionell"]', stagger: true },
  ],
  "fachliche-einordnung.html": [
    { selector: ".summary-box" },
    { selector: ".judgment-card", stagger: true },
  ],
  "ueber-mich.html": [
    { selector: ".profile-page .summary-box" },
  ],
};

const revealTargets = [];
const registeredRevealTargets = new Set();
const delayClasses = ["", "reveal-delay-1", "reveal-delay-2"];

const registerRevealGroup = ({ selector, stagger = false, fadeOnly = false, limit }) => {
  const elements = Array.from(document.querySelectorAll(selector));
  const selectedElements = Number.isInteger(limit) ? elements.slice(0, limit) : elements;

  selectedElements.forEach((element, index) => {
    if (registeredRevealTargets.has(element)) {
      return;
    }

    element.classList.add("reveal");
    if (fadeOnly) {
      element.classList.add("reveal-fade");
    }
    if (stagger) {
      const delayClass = delayClasses[index % delayClasses.length];
      if (delayClass) {
        element.classList.add(delayClass);
      }
    }

    registeredRevealTargets.add(element);
    revealTargets.push(element);
  });
};

(revealGroupsByPage[pageName] || []).forEach(registerRevealGroup);
registerRevealGroup({ selector: ".contact-cta, .read-next" });

if (revealTargets.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.4,
    });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }
}
