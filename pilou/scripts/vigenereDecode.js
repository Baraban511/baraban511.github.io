const texteOutput = document.getElementById("texteOutput");
const deuxiemeCleInput = document.getElementById("deuxiemeCleInput");
var deuxiemeCle = deuxiemeCleInput.value;
deuxiemeCleInput.addEventListener("input", () => {
  deuxiemeCle = deuxiemeCleInput.value;
  if (texte && deuxiemeCle) {
    texteOutput.textContent = encode(deuxiemeCle, texte);
  } else {
    texteOutput.textContent = "Mettre le code";
  }
});
const texteInput = document.getElementById("texteInput");
var texte = texteInput.value;
texteInput.addEventListener("input", () => {
  texte = texteInput.value;
  if (texte && deuxiemeCle) {
    texteOutput.textContent =decode(deuxiemeCle, texte) ;
  } else {
    texteOutput.textContent = "Mettre la clé";
  }
});
function decode(cle, texteChiffre) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let texteDechiffre = '';

  // Convertir tout en majuscules pour uniformité
  texteChiffre = texteChiffre.toUpperCase();
  cle = cle.toUpperCase();

  let indexCle = 0;

  for (let i = 0; i < texteChiffre.length; i++) {
      const lettre = texteChiffre[i];

      if (alphabet.includes(lettre)) {
          const indexLettre = alphabet.indexOf(lettre);
          const indexDecalage = alphabet.indexOf(cle[indexCle]);

          // Calcul de la lettre déchiffrée (en inversant le décalage)
          const indexDechiffre = (indexLettre - indexDecalage + 26) % 26;
          texteDechiffre += alphabet[indexDechiffre];

          // Passer à la lettre suivante de la clé
          indexCle = (indexCle + 1) % cle.length;
      } else {
          // Conserver les caractères non alphabétiques tels quels
          texteDechiffre += lettre;
      }
  }

  return texteDechiffre;
}