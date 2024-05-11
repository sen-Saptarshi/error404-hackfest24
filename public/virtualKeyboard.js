// const keys = [
//   ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
//   ['क', 'ख', 'ग', 'घ', 'ङ'],
//   ['च', 'छ', 'ज', 'झ', 'ञ'],
//   ['ट', 'ठ', 'ड', 'ढ', 'ण',],
//   ['त', 'थ', 'द', 'ध', 'न', "ढ", "ी"],
//   ['प', 'फ', 'ब', 'भ', 'म', "ृ", "े"],
//   ['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह','क्ष','त्र','ज्ञ'],
//   ['ं', 'ः', 'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्'],
//   ["←", "↵"],
// ];
const keys = [
  ['अ', 'क', 'च', 'ट', 'त', 'प', 'य', 'ं', '←'],
    ['आ', 'ख', 'छ', 'ठ', 'थ', 'फ', 'र', 'ः', '↵'],
    ['इ', 'ग', 'ज', 'ड', 'द', 'ब', 'ल', 'ा'],
    ['ई', 'घ', 'झ', 'ढ', 'ध', 'भ', 'व', 'ि'],
    ['उ', 'ङ', 'ञ', 'ण', 'न', 'म', 'श', 'ी'],
    ['ऊ', undefined, undefined, undefined, "ढ", "ृ", "ष", 'ू'],
    ['ए', undefined, undefined, undefined, "ी", "े", "स", 'ृ'],
    ['ऐ', undefined, undefined, undefined, undefined, "ै", "ह", 'े'],
    ['ओ', undefined, undefined, undefined, undefined, "ो", 'क्ष'],
    ['औ', undefined, undefined, undefined, undefined, "ौ", 'त्र'],
    ['अं', undefined, undefined, undefined, undefined, "्", 'ज्ञ'],
    ['अः', undefined, undefined, undefined, undefined, undefined, undefined],
  ["←", "↵"],
];
const textArea = document.getElementById("userInput");
const keyboardContainer = document.getElementById("keyboard");

function createKeyboard() {
  keys.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    row.forEach((key) => {
      const keyElement = document.createElement("div");
      keyElement.classList.add("key");
      keyElement.textContent = key;
      keyElement.addEventListener("click", () => {
        if (key === "←") {
          textArea.value = textArea.value.slice(0, -1);
          // } else if (key === "Caps Lock") {
          //   // Add Caps Lock functionality here
        } else if (key === "↵") {
          textArea.value += "\n";
        } else {
          textArea.value += key;
        }
      });
      rowElement.appendChild(keyElement);
    });
    keyboardContainer.appendChild(rowElement);
  });
}

createKeyboard();

function virtualKeyboard() {
  const keyboardElement = document.querySelector("#keyboard");
  if (keyboardElement.style.display === "none") {
    keyboardElement.style.display = "flex";
  } else {
    keyboardElement.style.display = "none";
  }
}
