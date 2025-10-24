/**
 * Jeu du BlackJack (simplifié)
 * @version 0.0.1
 */

/** @type {HTMLCanvasElement} */
const oCanvas = document.querySelector("#scene");
const oCtx = oCanvas.getContext("2d");

// ..........................
// Utilisation de fonction (faire l'appel de la fonction)
// Utiliser la fonction pour générer une combinaison de la loterie 6/49

// Récupérer la valeur retournée par la fonction et l'envoyer à la console
console.log("Une combinaison de 6/49 (distincts) : "
    , genererNombresAleatoires(6, 1, 49, true));
console.log("Une combinaison de 6/49 (distincts) : "
    , genererNombresAleatoires(6, 1, 49, true));
console.log("Une combinaison de 6/49 (PAS DISTINCTS) : "
    , genererNombresAleatoires(6, 1, 49));
console.log("Une combinaison impossible (15, 100, 13) : "
    , genererNombresAleatoires(15, 100, 13, false));


// Déclaration de fonction
// Définir une fonction très générale qui génère des nombres aléatoires
// IMPORTANT : Nom de la fonction, noms des paramètres, valeur de retour
function genererNombresAleatoires(nQuantite, nValMin, nValMax, bDistincts = false) {
    let sChoix = ";";
    // Validation de base
    if(nValMax < nValMin) {
        // On arrête la fonction et retourne un message d'erreur.
        return "La valeur maximale ne peut pas être plus petite que la valeur minimale.";
    }
    // Si nQuantite est plus grand que l'intervalle entre nValMin et nValMax et bDistincts est vrai.
    let nbAlea = 0;
    for(let i=0; i<nQuantite; i++) {
        nbAlea = Math.floor(Math.random()*(nValMax-nValMin+1)) + nValMin;
        if(bDistincts == true && sChoix.indexOf(`;${nbAlea};`) == -1) {
            sChoix = sChoix + nbAlea + ";";
        }
        else if(bDistincts == false) {
            sChoix = sChoix + nbAlea + ";";
        }
        else {
            i--
        }
    }
    // Valeur retournée par la fonction
    return sChoix;
}

/*
function genererNombresAleatoiresDistincts(nQuantite, nValMin, nValMax) {
    let sChoix = ";";
    let nbAlea = 0;
    for(let i=0; i<nQuantite; i++) {
        nbAlea = Math.floor(Math.random()*(nValMax-nValMin+1)) + nValMin;
        if(sChoix.indexOf(';' + nbAlea + ';') == -1) {
            sChoix = sChoix + nbAlea + ";";
        }
        else {
            i--; // on décrémente i pour refaire une itération
            // i=i-1;
        }
    }
    // Valeur retournée par la fonction
    return sChoix;
}
*/