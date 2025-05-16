function initAnnyang() {
  if (annyang) {
    const commands = {
      hello: function () {
        alert("Hello World!");
      },
      "change the color to *color": function (color) {
        document.body.style.backgroundColor = color;
      },
      "navigate to *page": function (page) {
        navigateToPage(page.toLowerCase());
      },
    };

    // Merge in page-specific commands if defined
    if (typeof pageSpecificCommands === "function") {
      const additionalCommands = pageSpecificCommands();
      Object.assign(commands, additionalCommands);
    }

    annyang.addCommands(commands);
    annyang.start();
    console.log("Annyang initialized and listening for commands");
  } else {
    console.error("Annyang not available");
  }
}

function navigateToPage(page) {
  switch (page) {
    case "home":
      window.location.href = "index.html";
      break;
    case "stocks":
      window.location.href = "stocks.html";
      break;
    case "dogs":
      window.location.href = "dogs.html";
      break;
    default:
      console.warn("Unknown page:", page);
  }
}

function turnOnAudio() {
  if (annyang) {
    annyang.start();
    console.log("Audio listening started");
  }
}

function turnOffAudio() {
  if (annyang) {
    annyang.abort();
    console.log("Audio listening stopped");
  }
}

async function fetchRandomQuote() {
  const quoteElement = document.getElementById("quote-text");
  const refreshBtn = document.getElementById("refresh-quote");

  if (quoteElement) quoteElement.textContent = "Loading...";
  if (refreshBtn) refreshBtn.disabled = true;

  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    if (data[0] && data[0].q && data[0].a) {
      quoteElement.innerHTML = `"${data[0].q}" — ${data[0].a}`;
    } else {
      quoteElement.innerHTML = `"Keep going, something great is coming." — Unknown`;
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteElement.innerHTML = `"Every artist dips his brush in his own soul, and paints his own nature into his pictures." — Henry Ward Beecher`;
  } finally {
    if (refreshBtn) refreshBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initAnnyang();
  fetchRandomQuote();

  const refreshBtn = document.getElementById("refresh-quote");
  const turnOnButton = document.getElementById("turn-on-audio");
  const turnOffButton = document.getElementById("turn-off-audio");

  if (refreshBtn) {
    refreshBtn.addEventListener("click", fetchRandomQuote);
  }
  if (turnOnButton) {
    turnOnButton.addEventListener("click", turnOnAudio);
  }
  if (turnOffButton) {
    turnOffButton.addEventListener("click", turnOffAudio);
  }
});
  
