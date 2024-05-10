/* Global Loading Animation */
function showLoading() {
  const loadingElement = document.getElementById("loading-animation"); // Replace with your element ID
  loadingElement.style.display = "block";
}

function hideLoading() {
  const loadingElement = document.getElementById("loading-animation"); // Replace with your element ID
  loadingElement.style.display = "none";
}

/* Translate API call Functionality */
async function translator() {
  showLoading();
  const userInputField = document.getElementById("userInput");
  const outputDiv = document.getElementById("output");
  const userInput = userInputField.value;
  const response = await fetch("/translate", {
    method: "POST", // Adjust to POST if your backend expects it
    body: JSON.stringify({ user: userInput }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    outputDiv.textContent = `Error: ${response.statusText}`;
    return;
  }
  const translatedText = await response.text();
  outputDiv.textContent = translatedText;
  hideLoading();
}
const inputField = document.getElementById("userInput");
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    translator(); // Replace with your actual function name
  }
});

/* Text to Speech Functionality */

const synth = window.speechSynthesis;
const inputTxt = document.getElementById("output");
const voiceSelect = document.getElementById("selector");

let voices;

function loadVoices() {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.value = i;
    voiceSelect.appendChild(option);
  }
}
if ("onvoiceschanged" in synth) {
  synth.onvoiceschanged = loadVoices;
} else {
  loadVoices();
}
// Speaking
const readAloud = (event) => {
  event.preventDefault();
  // Check if voices are loaded before accessing them
  if (voices && voices.length > 0) {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.innerText);
    utterThis.voice = voices[voiceSelect.value];
    synth.speak(utterThis);
  } else {
    // Handle the case where voices are not loaded yet
    console.log("Voices not loaded yet, please try again later.");
  }
};

/* Virtual KeyBoard Functionality */

const Keyboard = window.SimpleKeyboard.default;

const myKeyboard = new Keyboard({
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
});

function onChange(input) {
  document.getElementById("userInput").value = input;
  // console.log("Input changed", input);
}

function onKeyPress(button) {
  // console.log("Button pressed", button);
}
// visibility of virtual keyboard
function virtualKeyboard() {
  const keyboardElement = document.querySelector(".simple-keyboard");
  if (keyboardElement.style.display === "none") {
    keyboardElement.style.display = "block";
  } else {
    keyboardElement.style.display = "none";
  }
}
