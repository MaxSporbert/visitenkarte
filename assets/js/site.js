document.documentElement.classList.add("js");

const homeHero = document.querySelector(".hero");
if (homeHero) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    homeHero.classList.add("is-intro-visible");
  } else {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => homeHero.classList.add("is-intro-visible"));
    });
  }
}

const menuButton = document.querySelector("[data-menu-toggle]");
const siteNavigation = document.querySelector("[data-site-nav]");

if (menuButton && siteNavigation) {
  const isMenuOpen = () => menuButton.getAttribute("aria-expanded") === "true";

  const setMenuOpen = (open, { returnFocus = false } = {}) => {
    menuButton.setAttribute("aria-expanded", String(open));
    siteNavigation.dataset.open = String(open);
    document.body.classList.toggle("is-menu-open", open);
    if (!open && returnFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => setMenuOpen(!isMenuOpen()));

  siteNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  // Schließen per Escape und per Klick außerhalb; der Fokus kehrt zum
  // Menü-Button zurück, wenn er im Menü lag.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      setMenuOpen(false, { returnFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    if (isMenuOpen() && !siteNavigation.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  siteNavigation.addEventListener("focusout", (event) => {
    if (isMenuOpen() && event.relatedTarget && !siteNavigation.contains(event.relatedTarget) && event.relatedTarget !== menuButton) {
      setMenuOpen(false);
    }
  });

  window.matchMedia("(min-width: 861px)").addEventListener("change", (event) => {
    if (event.matches) {
      setMenuOpen(false);
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
      ? `${visibleCount} ${visibleCount === 1 ? "Frage wird" : "Fragen werden"} angezeigt.`
      : "Keine Frage passt zu dieser Auswahl.";
  };

  const setFaqCategory = (category) => {
    activeCategory = category;
    faqFilters.forEach((item) => {
      const isActive = (item.dataset.faqFilter || "alle") === category;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    applyFaqFilter();
  };

  faqFilters.forEach((button) => {
    button.addEventListener("click", () => setFaqCategory(button.dataset.faqFilter || "alle"));
  });

  faqSearch.addEventListener("input", applyFaqFilter);

  // Frühere Sprungmarken (#faq-betreuung usw.) wählen den passenden Filter.
  const hashCategory = window.location.hash.replace(/^#faq-/, "");
  const hasHashFilter = Array.from(faqFilters).some((item) => item.dataset.faqFilter === hashCategory);
  setFaqCategory(hasHashFilter ? hashCategory : "alle");
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
      ? `${visibleCount} ${visibleCount === 1 ? "Begriff wird" : "Begriffe werden"} angezeigt.`
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
    { selector: '.home-situation[aria-labelledby="start-abgrenzung"] > *, .home-boundary-list li', stagger: true },
    { selector: ".home-workflow .principle", stagger: true },
    { selector: ".home-region-copy, .home-region-map", stagger: true, fadeOnly: true },
    { selector: ".home-contact-heading" },
    { selector: ".home-contact-actions > *", stagger: true },
  ],
  "leistungen.html": [
    { selector: ".services-overview-page .service-area", stagger: true },
    { selector: ".special-care-grid .special-care-card", stagger: true },
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
    { selector: ".faq-resources", stagger: true },
  ],
  "begriffe.html": [
    { selector: ".faq-tools" },
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
registerRevealGroup({ selector: ".editorial-availability-notice", fadeOnly: true });
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

// Lange Seiten: angeheftetes Inhaltsverzeichnis (Desktop), Abschnitte als
// Akkordeon (mobil) und eine „Nach oben“-Schaltfläche. Ohne JavaScript
// bleiben alle Inhalte offen sichtbar.
const sectionNavRoot = document.querySelector("[data-section-nav]");
const compactQuery = window.matchMedia("(max-width: 860px)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (sectionNavRoot) {
  // Ein Abschnitt besteht aus seiner Überschrift und den folgenden
  // Geschwisterelementen bis zur nächsten Überschrift. Die Elemente bleiben
  // an ihrem Platz, damit bestehende Layoutregeln weiter greifen.
  const sections = [];
  const collectItems = (heading, stop) => {
    const items = [];
    let next = heading.nextElementSibling;
    while (next && !stop(next)) {
      items.push(next);
      next = next.nextElementSibling;
    }
    return items;
  };

  if (sectionNavRoot.querySelector(".legal-content")) {
    sectionNavRoot.querySelectorAll(".legal-content > h2[id]:not([data-own-index])").forEach((heading) => {
      sections.push({ heading, items: collectItems(heading, (element) => element.tagName === "H2") });
    });
  } else {
    sectionNavRoot.querySelectorAll(".content-section > h2[id]").forEach((heading) => {
      sections.push({ heading, items: collectItems(heading, () => false) });
    });
  }

  sections.forEach((section, index) => {
    section.heading.dataset.sectionIndex = String(index);
  });

  // Seiten mit eigenem Verzeichnis: Rücksprunglink am Ende jedes Abschnitts.
  const ownIndex = sectionNavRoot.querySelector("[data-own-index]");
  if (ownIndex && ownIndex.id) {
    sections.forEach((section) => {
      const back = document.createElement("p");
      back.className = "section-back";
      back.innerHTML = `<a class="text-link" href="#${ownIndex.id}">Zur Inhaltsübersicht</a>`;
      (section.items[section.items.length - 1] || section.heading).after(back);
      section.items.push(back);
    });
  }

  sections.forEach((section) => {
    section.items.forEach((item, itemIndex) => {
      item.id = item.id || `${section.heading.id}-teil-${itemIndex + 1}`;
    });
  });

  // Desktop: Leiste „Auf dieser Seite“, die beim Scrollen oben bleibt.
  const toc = document.createElement("nav");
  toc.className = "section-toc";
  toc.setAttribute("aria-label", "Auf dieser Seite");
  const tocLabel = document.createElement("span");
  tocLabel.className = "section-toc-label";
  tocLabel.textContent = "Auf dieser Seite";
  const tocList = document.createElement("ol");
  sections.forEach(({ heading }) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    item.append(link);
    tocList.append(item);
  });
  toc.append(tocLabel, tocList);
  const tocAnchor = sections[0]?.heading.closest(".content-section") || sections[0]?.heading;
  if (sections.length && tocAnchor && !ownIndex) {
    tocAnchor.before(toc);
  }

  const tocLinks = Array.from(tocList.querySelectorAll("a"));
  if ("IntersectionObserver" in window && tocLinks.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const index = Number(entry.target.dataset.sectionIndex);
        tocLinks.forEach((link, linkIndex) => {
          if (linkIndex === index) {
            link.setAttribute("aria-current", "true");
            const list = link.closest("ol");
            if (list && list.scrollWidth > list.clientWidth) {
              list.scrollTo({ left: link.offsetLeft - 24, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
            }
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sections.forEach(({ heading }) => activeObserver.observe(heading));
  }

  // Mobil: Überschriften öffnen und schließen ihren Abschnitt.
  // Browser ohne „hidden=until-found“ blenden normal aus; die Suche im
  // Browser findet geschlossene Abschnitte dann nicht.
  const hiddenValue = "onbeforematch" in document.body ? "until-found" : "";

  const setOpen = (section, open) => {
    section.button.setAttribute("aria-expanded", String(open));
    section.heading.parentElement.classList.toggle("is-section-open", open);
    section.items.forEach((item) => {
      if (open) {
        item.removeAttribute("hidden");
      } else {
        item.setAttribute("hidden", hiddenValue);
      }
    });
  };

  const enableAccordion = () => {
    sections.forEach((section) => {
      if (section.button) {
        return;
      }
      const button = document.createElement("button");
      button.type = "button";
      button.className = "section-toggle";
      button.setAttribute("aria-controls", section.items.map((item) => item.id).join(" "));
      while (section.heading.firstChild) {
        button.append(section.heading.firstChild);
      }
      section.heading.append(button);
      section.button = button;
      button.addEventListener("click", () => {
        setOpen(section, button.getAttribute("aria-expanded") !== "true");
      });
      section.items.forEach((item) => item.addEventListener("beforematch", () => setOpen(section, true)));
      setOpen(section, false);
    });
  };

  const disableAccordion = () => {
    sections.forEach((section) => {
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
  };

  const openSectionFor = (target) => {
    if (!target) {
      return;
    }
    const section = sections.find(({ heading, items }) => heading === target || items.some((item) => item.contains(target)));
    if (section && section.button) {
      setOpen(section, true);
    }
  };

  const openFromHash = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) {
      openSectionFor(document.getElementById(id));
    }
  };

  const syncAccordion = () => {
    if (compactQuery.matches) {
      enableAccordion();
      openFromHash();
    } else {
      disableAccordion();
    }
  };

  syncAccordion();
  compactQuery.addEventListener("change", syncAccordion);
  window.addEventListener("hashchange", openFromHash);
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (link) {
      openSectionFor(document.getElementById(decodeURIComponent(link.hash.slice(1))));
    }
  });

  if (window.location.hash) {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }
}

// „Nach oben“: erscheint ab zwei Bildschirmhöhen Scrollweg.
const backToTop = document.createElement("button");
backToTop.type = "button";
backToTop.className = "back-to-top";
backToTop.hidden = true;
backToTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span>Nach oben</span>';
document.body.append(backToTop);

let backToTopTicking = false;
const updateBackToTop = () => {
  backToTop.hidden = window.scrollY < window.innerHeight * 2;
  backToTopTicking = false;
};
window.addEventListener("scroll", () => {
  if (!backToTopTicking) {
    backToTopTicking = true;
    requestAnimationFrame(updateBackToTop);
  }
}, { passive: true });
updateBackToTop();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  const skipTarget = document.querySelector(".site-brand");
  if (skipTarget) {
    skipTarget.focus({ preventScroll: true });
  }
});
