let alphaMelange = {};
let alphabet= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function enregistrelettres(){
    let meme=false
    let occur = false
    for(lettre of alphabet){
        let input = document.getElementById("inp"+lettre);

        if(Object.values(alphaMelange).includes(input.value)){
            occur = true
        };

        alphaMelange[lettre] = input.value;

        if(alphaMelange[lettre]===lettre){
            meme=true
        };

        


        

    };

    alphaMelange["É"] = document.getElementById("inpE").value;
    alphaMelange["È"] = document.getElementById("inpE").value;
    alphaMelange["Ë"] = document.getElementById("inpE").value;
    alphaMelange["Ê"] = document.getElementById("inpE").value;

    alphaMelange["À"] = document.getElementById("inpA").value;

    alphaMelange["Ï"] = document.getElementById("inpI").value;

    alphaMelange["Ô"] = document.getElementById("inpO").value;

    alphaMelange["Û"] = document.getElementById("inpU").value;
    alphaMelange["Ù"] = document.getElementById("inpU").value;

    alphaMelange["Ç"] = document.getElementById("inpC").value;


    localStorage.setItem("alphaMelange", JSON.stringify(alphaMelange)); 
    
    if(meme===true || occur===true){
        resEnreg.innerHTML = "Vous ne devez pas assigner une lettre en clair avec la meme lettre codé OU utiliser un lettre qu'une seule fois"
    }else{
        resEnreg.innerHTML = "enregistré !";
        };
    };
    
    
    






function transform(){
    let inpMessclair = document.getElementById("messageClair").value;
    let messClairMaj = inpMessclair.toUpperCase();
    let motRes = "";
    for (lettreClair of messClairMaj){
        if (lettreClair === " "){
            motRes += ""
            continue;
        };

        if (lettreClair === "?"){
            motRes += ""
            continue;
        };

        if (lettreClair === ","){
            motRes += ""
            continue;
        };

        if (lettreClair === "!"){
            motRes += ""
            continue;
        };
        if (lettreClair === "'"){
            motRes += ""
            continue;
        };




        let lettreTrans = alphaMelange[lettreClair];
        motRes += lettreTrans ;

    };
    let resultatFinal = ""
    for (let i = 0; i < motRes.length ;i += 5 ){
        resultatFinal += motRes.slice(i, i+5)+" ";
    };
    let resultatFinalMaj = resultatFinal.toUpperCase()
resMotCode.innerHTML = resultatFinalMaj
};






//deuxième page:




function afficherCle() {
    if (localStorage.getItem("alphaMelange")) {
        alphaMelange = JSON.parse(localStorage.getItem("alphaMelange"));
    }
    let cle=""
    for(let lettre of alphabet){
        cle += "La lettre codé " + alphaMelange[lettre] + "  ➢  " + lettre + " en lettre clair"+ "<br>";
    };
resCle.innerHTML = cle
};


function reTransform(){
    if (localStorage.getItem("alphaMelange")) {
        alphaMelange = JSON.parse(localStorage.getItem("alphaMelange"));
    }

    delete alphaMelange["È"]
    delete alphaMelange["É"]
    delete alphaMelange["Ë"]
    delete alphaMelange["Ê"]

    delete alphaMelange["À"]

    delete alphaMelange["Ï"]

    delete alphaMelange["Ô"]

    delete alphaMelange["Û"]
    delete alphaMelange["Ù"]

    delete alphaMelange["Ç"]

    let AlphaALenvers = {}
    for (let i in alphaMelange){
        AlphaALenvers[alphaMelange[i]] = i
    };


    let inpMessCode = document.getElementById("messCode").value;
    let messCodeMaj = inpMessCode.toUpperCase();
    let motDecode = ""
    for(LettreCode of messCodeMaj){

        if (LettreCode === "?"){
            motDecode += ""
            continue;
        };
        if (LettreCode === " "){
            motDecode += ""
            continue;
        };
        if (LettreCode === "!"){
            motDecode += ""
            continue;
        };



        let LettreReTrans = AlphaALenvers[LettreCode]
        motDecode += LettreReTrans
    };
resMotDecode.innerHTML = motDecode
};






