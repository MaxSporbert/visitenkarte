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

  const isWeekday = day >= 1 && day <= 5;
  const isAvailable = isWeekday && currentMinutes >= start && currentMinutes < end;

  const text = document.getElementById("availabilityText");
  const dot = document.getElementById("availabilityDot");
  const status = document.getElementById("availability");

  if (!text || !dot || !status) return;

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
  } else if (isWeekday && currentMinutes < start) {
    message = "Telefonische Sprechzeit heute: 10:00–12:00 Uhr";
    color = "#9b6514";
    glow = "rgba(155, 101, 20, .16)";
    background = "rgba(255, 246, 229, .76)";
    border = "rgba(155, 101, 20, .24)";
  } else if (isWeekday && currentMinutes >= end) {
    message = "Heute telefonisch nicht mehr erreichbar – E-Mail jederzeit möglich";
    color = "#74706a";
    glow = "rgba(116, 112, 106, .15)";
    background = "rgba(245, 242, 236, .76)";
    border = "rgba(116, 112, 106, .20)";
  } else {
    message = "Telefonische Sprechzeit: Mo–Fr 10:00–12:00 Uhr";
    color = "#74706a";
    glow = "rgba(116, 112, 106, .15)";
    background = "rgba(245, 242, 236, .76)";
    border = "rgba(116, 112, 106, .20)";
  }

  text.textContent = message;
  dot.style.background = color;
  dot.style.boxShadow = "0 0 0 4px " + glow;
  status.style.background = background;
  status.style.borderColor = border;
}

updateAvailability();
setInterval(updateAvailability, 60000);
