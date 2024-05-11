/* Global Loading Animation */
function showLoading() {
  const loadingElement = document.getElementById("loading-animation"); // Replace with your element ID
  loadingElement.style.display = "block";
}

function hideLoading() {
  const loadingElement = document.getElementById("loading-animation"); // Replace with your element ID
  loadingElement.style.display = "none";
}

/* Typing Effect */
function typeWriter(textElement, text, speed) {
  let i = 0;
  const typewriter = () => {
    if (i < text.length) {
      textElement.textContent += text.charAt(i);
      i++;
      setTimeout(typewriter, speed);
    }
  };

  typewriter();
}

/* Model Selector */
const models = ["English to Hinglish", "Hinglish to English"];
let modelCode = 0;
const modelSelector = document.getElementById("modelSelector");
for (let i = 0; i < models.length; i++) {
  const optionforModel = document.createElement("option");
  optionforModel.textContent = `${models[i]}`;
  optionforModel.value = i;
  modelSelector.appendChild(optionforModel);
}
modelSelector.addEventListener("change", (event) => {
  // Get the selected option's value (index in the models array)
  modelCode = parseInt(event.target.value);
  // console.log("Selected model:", models[modelCode]); // Optional for debugging
});

/* Translate API call Functionality */
async function translator() {
  showLoading();
  const userInputField = document.getElementById("userInput");
  const outputDiv = document.getElementById("output");
  outputDiv.textContent = "";
  let userInput = userInputField.value.toLowerCase();
  const response = await fetch("/translate", {
    method: "POST", // Adjust to POST if your backend expects it
    body: JSON.stringify({ user: userInput, code: modelCode }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    outputDiv.textContent = `Error: ${response.statusText}`;
    return;
  }
  const translatedText = await response.text();
  hideLoading();
  const textElement = document.querySelector("#output");
  const text = translatedText;
  const speed = 50; // Adjust speed here (lower for faster typing)
  typeWriter(textElement, text, speed);
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
const voiceSelect = document.getElementById("voiceSelector");

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

