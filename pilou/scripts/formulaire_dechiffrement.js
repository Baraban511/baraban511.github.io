
function dechiffrementParDecalage(message, decalage) {
    let result = '';
    for (let i = 0; i < message.length; i++) {
        let char = message.charAt(i);
        if (char.match(/[a-z]/i)) {
            const code = message.charCodeAt(i);
            let base = (char.toUpperCase() === char) ? 65 : 97;
            let newCode = (code - base - decalage + 26) % 26 + base;  // Décalage inverse (vers la gauche)
            result += String.fromCharCode(newCode);
        } else {
            result += char;
        }
    }
    return result;
}
function decrypterMessage(event) {
    event.preventDefault();

    const decalage = parseInt(document.getElementById('decalage').value);
    const messageChiffre = document.getElementById('messageChiffre').value;

    const messageDechiffre = dechiffrementParDecalage(messageChiffre, decalage);

    // Affichage du message déchiffré
    document.getElementById('messageDechiffre').textContent = `Voici votre message déchiffré : ${messageDechiffre}`;
    document.getElementById('resultat').style.display = 'block';
}