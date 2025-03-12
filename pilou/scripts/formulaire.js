
function chiffrementParDecalage(message, decalage) {
    let result = '';
    for (let i = 0; i < message.length; i++) {
        let char = message.charAt(i);
        if (char.match(/[a-z]/i)) {
            const code = message.charCodeAt(i);
            let base = (char.toUpperCase() === char) ? 65 : 97;
            let newCode = (code - base + decalage) % 26 + base;
            result += String.fromCharCode(newCode);
        } else {
            result += char;
        }
    }
    return result;
}

function creerCodeSecret(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const decalage = parseInt(document.getElementById('decalage').value);
    const message = document.getElementById('message').value;

    const messageChiffre = chiffrementParDecalage(message, decalage);

    const messageSecret = `Bonjour ${prenom} ${nom}, vous avez choisi ${decalage} caractères de décalage. Voici votre code secret : ${messageChiffre}`;
    document.getElementById('messageSecret').textContent = messageSecret;
    document.getElementById('resultat').style.display = 'block';
}