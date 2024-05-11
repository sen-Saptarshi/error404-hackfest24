const keys = [
  ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
  ['क्','ख्','ग','घ्','ङ्'],
  ["ह", "न", "म", " ", "च", "ट", "व", "ल", "श"],
  ["क", "ख", "ग", "घ", "ङ", "ड", "ढ़", "ा", "ि"],
  ["ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ी", "उ"],
  ["प", "फ", "ब", "भ", "म", "य", "र", "ृ", "े"],
  ["-", "ळ", "व", "श", "ष", "स", "ह", "ए", "ै"],
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
