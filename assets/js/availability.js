// Abwesenheiten (jeweils einschließlich). Bei neuer Urlaubsmeldung hier
// und in den Hinweisboxen auf Startseite und Kontaktseite pflegen.
const ABSENCES = [
  ["2026-11-02", "2026-11-06"],
];

function updateAvailability() {
  const now = new Date();

  const berlinTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
  );

  const day = berlinTime.getDay();
  const hour = berlinTime.getHours();
  const minute = berlinTime.getMinutes();
  const currentMinutes = hour * 60 + minute;

  const start = 10 * 60;
  const end = 12 * 60;

  const isoDate = [
    berlinTime.getFullYear(),
    String(berlinTime.getMonth() + 1).padStart(2, "0"),
    String(berlinTime.getDate()).padStart(2, "0"),
  ].join("-");
  const absence = ABSENCES.find(([from, to]) => isoDate >= from && isoDate <= to);

  const isWeekday = day >= 1 && day <= 5;
  const isAvailable = !absence && isWeekday && currentMinutes >= start && currentMinutes < end;

  let message;
  let color;
  let glow;
  let background;
  let border;

  if (isAvailable) {
    message = "Telefonisch erreichbar";
    color = "#236d43";
    glow = "rgba(35, 109, 67, .16)";
    background = "rgba(237, 248, 241, .74)";
    border = "rgba(35, 109, 67, .24)";
  } else {
    message = "Telefonische Sprechzeit: Mo–Fr 10:00–12:00 Uhr";
    color = "#74706a";
    glow = "rgba(116, 112, 106, .15)";
    background = "rgba(245, 242, 236, .76)";
    border = "rgba(116, 112, 106, .20)";
  }

  const badges = document.querySelectorAll("[data-availability-badge]");

  badges.forEach((status) => {
    const text = status.querySelector("[data-availability-text]");
    const dot = status.querySelector("[data-availability-dot]");

    if (!text || !dot) return;

    text.textContent = message;
    dot.style.background = color;
    dot.style.boxShadow = "0 0 0 4px " + glow;
    status.style.background = background;
    status.style.borderColor = border;
  });

  document.querySelectorAll("[data-header-availability]").forEach((link) => {
    const text = link.querySelector("[data-header-availability-text]");
    const dot = link.querySelector("[data-header-availability-dot]");

    if (text) {
      if (isAvailable) {
        text.textContent = "Jetzt telefonisch erreichbar";
      } else if (absence) {
        const [, month, dayOfMonth] = absence[1].split("-");
        text.textContent = `Urlaub bis ${dayOfMonth}.${month}. · E-Mail möglich`;
      } else {
        text.textContent = "Telefon Mo–Fr 10–12 Uhr";
      }
    }
    if (dot) {
      dot.style.background = color;
      dot.style.boxShadow = "0 0 0 4px " + glow;
    }
    link.dataset.state = isAvailable ? "open" : "closed";
  });

  const contactAvailabilityCards = document.querySelectorAll("[data-contact-availability]");
  const emailColor = "#236d43";
  const emailGlow = "rgba(35, 109, 67, .16)";

  contactAvailabilityCards.forEach((card) => {
    const emailDot = card.querySelector("[data-contact-email-dot]");
    const faxDot = card.querySelector("[data-contact-fax-dot]");
    const phoneDot = card.querySelector("[data-contact-phone-dot]");
    const phoneText = card.querySelector("[data-contact-phone-text]");

    [emailDot, faxDot].forEach((dot) => {
      if (!dot) return;
      dot.style.background = emailColor;
      dot.style.boxShadow = "0 0 0 4px " + emailGlow;
    });

    if (phoneDot) {
      phoneDot.style.background = color;
      phoneDot.style.boxShadow = "0 0 0 4px " + glow;
    }

    if (phoneText) {
      phoneText.textContent = isAvailable ? "jetzt erreichbar" : "Mo–Fr 10:00–12:00 Uhr";
    }
  });
}

updateAvailability();
setInterval(updateAvailability, 60000);
