document.addEventListener("DOMContentLoaded", function () {
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (anchorLink) {
    anchorLink.addEventListener("click", function (event) {
      event.preventDefault();
      var targetId = this.getAttribute("href");
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

const button = document.getElementById("nav-button");
const nav = document.getElementById("mynav");

button.addEventListener("click", () => {
  nav.classList.toggle("show");
});

/* Typing Animation */
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

/* ModelSelector */
const models = [
  "English to Hinglish (assistant)",
  "Hinglish to English (assistant)",
  "English to Hinglish (query)",
  "Hinglish to English (query)",
  "English to Sanskrit",
  "English to Hindi",
];
let modelCode = 0;
const modelNames = document.getElementById("modelNames");
for (let i = 0; i < models.length; i++) {
  const element = models[i];
  const div = document.createElement("div");
  div.className = "models";
  div.id = i;
  div.innerText = element;
  modelNames.appendChild(div);
}
modelNames.addEventListener("click", (event) => {
  modelCode = parseInt(event.target.id);
  document.getElementById("output").textContent = `Selected Model: ${models[modelCode]}`;
});

/* Translator */
async function translator() {
  //   showLoading();
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
  //   hideLoading();
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

/* TTS */

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
    console.log("Voices not loaded yet, please try again later.");
  }
};

/* Virtual Keyboard */

// suggestions

const sentences = [
  "English to Hinglish - Schedule a meeting for today itself.",
  "Hinglish to Engllish - aaj kitne alarms hai?",
  "English to Hinglish interrogative - Can you do it?",
  "Hinglish to English interrogative - What is the schedule today?",
];
const suggestion = document.getElementById("suggestion");
for (let i = 0; i < sentences.length; i++) {
  const suggestions = document.createElement("div");
  suggestions.className = "suggestions";
  suggestions.innerText = sentences[i];
  suggestion.appendChild(suggestions);
}


//button active status

const buttons = document.querySelectorAll('.models');

// Function to handle button click
function handleClick(event) {
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}
