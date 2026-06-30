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

const contactTemplates = {
  "allgemeine-anfrage": {
    label: "Betreff und Text werden für eine allgemeine Anfrage vorbereitet.",
    subject: "Allgemeine Anfrage an das Betreuungsbüro",
    body: "Guten Tag Herr Sporbert,%0A%0Aich habe eine allgemeine Anfrage.%0A%0AName:%0ATelefonnummer:%0AAnliegen:%0ABezug zu einem Verfahren oder Beschluss:%0A%0AMit freundlichen Grüßen"
  },
  "unterlagen-senden": {
    label: "Betreff und Text werden für die Übersendung von Unterlagen vorbereitet.",
    subject: "Unterlagen für das Betreuungsbüro",
    body: "Guten Tag Herr Sporbert,%0A%0Aich möchte Unterlagen übersenden.%0A%0AName:%0ATelefonnummer:%0AWelche Unterlagen liegen vor?:%0AVon welcher Stelle stammt das Schreiben?:%0AGibt es eine Frist?:%0A%0AMit freundlichen Grüßen"
  },
  "rueckrufwunsch": {
    label: "Betreff und Text werden für einen Rückrufwunsch vorbereitet.",
    subject: "Rückrufwunsch",
    body: "Guten Tag Herr Sporbert,%0A%0Aich bitte um einen Rückruf.%0A%0AName:%0ATelefonnummer:%0AWann sind Sie erreichbar?:%0AAnliegen:%0A%0AMit freundlichen Grüßen"
  },
  "abstimmung-verfahren": {
    label: "Betreff und Text werden für eine Abstimmung zu einem Verfahren vorbereitet.",
    subject: "Abstimmung zu einem Verfahren",
    body: "Guten Tag Herr Sporbert,%0A%0Aich möchte eine Abstimmung zu einem Verfahren anfragen.%0A%0AName:%0ATelefonnummer:%0AZuständige Stelle oder Gericht:%0AWorum geht es konkret?:%0AWelche Unterlagen liegen vor?:%0A%0AMit freundlichen Grüßen"
  },
  "neue-kontaktdaten": {
    label: "Betreff und Text werden für die Mitteilung neuer Kontaktdaten vorbereitet.",
    subject: "Mitteilung neuer Kontaktdaten",
    body: "Guten Tag Herr Sporbert,%0A%0Aich möchte geänderte Kontaktdaten mitteilen.%0A%0AName:%0ABisherige Kontaktdaten:%0ANeue Kontaktdaten:%0AAb wann gelten die Änderungen?:%0A%0AMit freundlichen Grüßen"
  },
  "frage-betreuung": {
    label: "Betreff und Text werden für eine Frage zur rechtlichen Betreuung vorbereitet.",
    subject: "Frage zur rechtlichen Betreuung",
    body: "Guten Tag Herr Sporbert,%0A%0Aich habe eine Frage zur rechtlichen Betreuung.%0A%0AName:%0ATelefonnummer:%0AWelche Situation soll eingeordnet werden?:%0AGibt es bereits einen Beschluss oder ein Schreiben?:%0A%0AMit freundlichen Grüßen"
  },
  "frage-verfahrenspflegschaft": {
    label: "Betreff und Text werden für eine Frage zur Verfahrenspflegschaft vorbereitet.",
    subject: "Frage zur Verfahrenspflegschaft",
    body: "Guten Tag Herr Sporbert,%0A%0Aich habe eine Frage zur Verfahrenspflegschaft.%0A%0AName:%0ATelefonnummer:%0AIn welchem Verfahren besteht die Frage?:%0ALiegen bereits Unterlagen oder Termine vor?:%0A%0AMit freundlichen Grüßen"
  }
};

const contactTopic = document.querySelector("[data-contact-topic]");
const contactLaunch = document.querySelector("[data-contact-launch]");
const contactPreview = document.querySelector("[data-contact-preview]");

if (contactTopic && contactLaunch && contactPreview) {
  const updateContactTemplate = () => {
    const template = contactTemplates[contactTopic.value] || contactTemplates["allgemeine-anfrage"];
    contactPreview.textContent = template.label;
    contactLaunch.href = `mailto:kontakt@buero-betreuung.de?subject=${encodeURIComponent(template.subject)}&body=${template.body}`;
  };

  contactTopic.addEventListener("change", updateContactTemplate);
  updateContactTemplate();
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
