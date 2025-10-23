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
console.log("Une combinaison de 6/49 : ", genererNombresAleatoires(6, 1, 49));
console.log("Une combinaison de 6/49 : ", genererNombresAleatoires(6, 1, 49));
console.log("Une combinaison de 6/49 : ", genererNombresAleatoires(6, 1, 49));
console.log("25 nombres entre 1000 et 1500 : ", genererNombresAleatoires(25, 1000, 1500));
console.log("3 nombres entre 10 et 20 : ", genererNombresAleatoires(3, 10, 20));
console.log("1000 nombres entre 5 et 7 : ", genererNombresAleatoires(1000, 5, 7));




// Déclaration de fonction
// Définir une fonction très générale qui génère des nombres aléatoires
// IMPORTANT : Nom de la fonction, noms des paramètres, valeur de retour
function genererNombresAleatoires(nQuantite, nValMin, nValMax) {
    let sChoix = "";
    for(let i=0; i<nQuantite; i++) {
        
        sChoix = sChoix + (Math.floor(Math.random()*(nValMax-nValMin+1)) + nValMin) + ";";
    }
    // Valeur retournée par la fonction
    return sChoix;
}