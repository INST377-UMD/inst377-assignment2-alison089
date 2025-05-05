function initializeVoiceCommands() {
  if (annyang) {
    // Define the commands
    const commands = {
      hello: function () {
        alert("Hello World!");
      },
      "change the color to :color": function (color) {
        changeBackgroundColor(color);
      },
      "navigate to :page": function (page) {
        navigateToPage(page);
      },
    };

    // Add page-specific commands
    if (typeof addPageSpecificCommands === "function") {
      addPageSpecificCommands(commands);
    }

    // Add the commands
    annyang.addCommands(commands);

    // Set up buttons
    document
      .getElementById("turnOnListening")
      .addEventListener("click", function () {
        annyang.start();
        alert("Voice commands are now active!");
      });

    document
      .getElementById("turnOffListening")
      .addEventListener("click", function () {
        annyang.abort();
        alert("Voice commands are now off.");
      });
  } else {
    console.log("annyang not loaded");
  }
}

// Change background color
function changeBackgroundColor(color) {
  const validColors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "white",
    "black",
    "gray",
  ];
  const colorMap = {
    red: "#ff6b6b",
    blue: "#74b9ff",
    green: "#55efc4",
    yellow: "#fdcb6e",
    purple: "#a29bfe",
    orange: "#fd9644",
    pink: "#fd79a8",
    white: "#ffffff",
    black: "#000000",
    gray: "#dfe6e9",
  };

  const lowerColor = color.toLowerCase();
  if (validColors.includes(lowerColor)) {
    document.body.style.backgroundColor = colorMap[lowerColor];
  } else {
    alert(
      `Sorry, ${color} is not a valid color option. Try red, blue, green, yellow, purple, orange, pink, white, black, or gray.`
    );
  }
}

// Navigate to page
function navigateToPage(page) {
  const lowerPage = page.toLowerCase();
  if (lowerPage === "home") {
    window.location.href = "index.html";
  } else if (lowerPage === "stocks") {
    window.location.href = "stocks.html";
  } else if (lowerPage === "dogs") {
    window.location.href = "dogs.html";
  } else {
    alert(
      `Sorry, I can't navigate to ${page}. Try "home", "stocks", or "dogs".`
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeVoiceCommands();
});
