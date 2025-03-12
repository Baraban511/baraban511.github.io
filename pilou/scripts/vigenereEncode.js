const codeOutput = document.getElementById("codeOutput");
const cleInput = document.getElementById("cleInput");
var cle = cleInput.value;
cleInput.addEventListener("input", () => {
  cle = cleInput.value;
  if (code && cle) {
    codeOutput.textContent = encode(cle, code);
  } else {
    codeOutput.textContent = "Mettre le texte";
  }
});
const codeInput = document.getElementById("codeInput");
var code = codeInput.value;
codeInput.addEventListener("input", () => {
  code = codeInput.value;
  if (code && cle) {
    codeOutput.textContent =formatText(encode(cle, code)) ;
  } else {
    codeOutput.textContent = "Mettre la clé";
  }
});

function encode(key, text) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let keyIndex = 0;
  const ignoreChars = [",", ".", "'", ";", ":"];

  for (let i = 0; i < text.length; i++) {
    let char = text[i].toUpperCase();
    if (ignoreChars.includes(char)) {
      continue; // Ignore les caractères spécifiés
    }
    if (alphabet.includes(char)) {
      let textIndex = alphabet.indexOf(char);
      let keyChar = key[keyIndex % key.length].toUpperCase();
      let keyIndexValue = alphabet.indexOf(keyChar);
      let newIndex = (textIndex + keyIndexValue) % alphabet.length;
      result += alphabet[newIndex];
    }
  }
  return result;
}
function formatText(text) {
    // Supprimer tous les espaces
    let cleanText = text.replace(/\s+/g, "");
    // Ajouter un espace tous les 5 caractères
    return cleanText.match(/.{1,5}/g)?.join(" ") || "";
}