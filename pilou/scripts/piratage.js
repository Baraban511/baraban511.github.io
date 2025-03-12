function trad() {
    let message = document.getElementById('message').value;
    let secret = "";

    let freq = {};
    
    // Dictionnaire des fréquences de chaque lettre
    for (let lettre of message) {
        if(lettre!=' '){
            if (lettre in freq) {
                freq[lettre] += 1;
            } else {
                freq[lettre] = 1;
            }
        }
    }
   
     // Trouver la lettre avec la plus haute fréquence
    let max = 0;
    let lmax = "";
    for (let letr in freq) {
        let fréquence = freq[letr];
        if (fréquence > max) {
            max = fréquence;
            lmax = letr;
        }
    }

    // lmax correspond à E
    // Calculer le pas de décalage
    let codeE = 'E'.charCodeAt(0);
    let codeX = lmax.charCodeAt(0);
    let pas = codeX - codeE;

    // Déchiffrer le message secret
    for (let letrr of message) {
		if(letrr != " "){
            let codeL = letrr.charCodeAt(0);
            let codeNEW = codeL - pas;
		    if (codeNEW<'A'.charCodeAt(0)){
		        let diff='A'.charCodeAt(0)-codeNEW;
		        codeNEW='Z'.charCodeAt(0)-diff+1;
		    }
		    if (codeNEW>'Z'.charCodeAt(0)){
		        let diff=codeNEW-'Z'.charCodeAt(0);
		        codeNEW='A'.charCodeAt(0)+diff-1;
		    }
        let ne = String.fromCharCode(codeNEW);
        secret += ne;
        }
	}

    document.getElementById('result').innerText = "Le mot secret est : " + secret;
}
	