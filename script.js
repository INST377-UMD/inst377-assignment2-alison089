function pageSpecificCommands() {
    return {
      "change the color to *color": function (color) {
        changeBackgroundColor(color);
      },
  
      "lookup *stock": function (stock) {
        const input = document.getElementById("ticker");
        const button = document.getElementById("lookup-stock");
        if (input && button) {
          input.value = stock.toUpperCase();
          button.click();
        }
      }
    };
  }
  
  // Handles color conversion and validation
  function changeBackgroundColor(color) {
    const validColors = {
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
  
    if (validColors[lowerColor]) {
      document.body.style.backgroundColor = validColors[lowerColor];
      console.log(`Background changed to ${lowerColor}`);
    } else {
      alert(
        `Sorry, "${color}" is not a supported color.\nTry: ${Object.keys(validColors).join(", ")}.`
      );
    }
  }
  
