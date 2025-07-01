const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");
const del = document.getElementById("delete");
const toggleTheme = document.getElementById("toggle-theme");

// Button click
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (value) {
      display.value += value;
    }
  });
});

// Clear button
clear.addEventListener("click", () => {
  display.value = "";
});

// Delete button
del.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
});

// Equal button
equals.addEventListener("click", () => {
  try {
    // Evaluate using Function constructor (safer than eval)
    const result = new Function('return ' + display.value.replace(/÷/g, '/').replace(/×/g, '*'))();
    display.value = result;
  } catch {
    display.value = "Error";
  }
});

// Keyboard input
document.addEventListener("keydown", (e) => {
  const allowedKeys = "0123456789+-*/().";
  if (allowedKeys.includes(e.key)) {
    display.value += e.key;
  } else if (e.key === "Enter") {
    equals.click();
  } else if (e.key === "Backspace") {
    del.click();
  } else if (e.key === "Escape") {
    clear.click();
  }
});

// Theme toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
