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
/*
console.log("Une combinaison de 6/49 (distincts) : "
    , genererNombresAleatoires(6, 1, 49, true));
console.log("Une combinaison de 6/49 (distincts) : "
    , genererNombresAleatoires(6, 1, 49, true));
console.log("Une combinaison de 6/49 (PAS DISTINCTS) : "
    , genererNombresAleatoires(6, 1, 49));
console.log("Une combinaison impossible (15, 100, 13) : "
    , genererNombresAleatoires(15, 100, 13, false));
*/

// Déclaration de fonction
// Définir une fonction très générale qui génère des nombres aléatoires
// IMPORTANT : Nom de la fonction, noms des paramètres, valeur de retour
/**
 * Génère des nombres aléatoires avec ou sans remise.
 * @param {Number} nQuantite Nombre de nombres aléatoires demandés.
 * @param {Number} nValMin Valeur minimale.
 * @param {Number} nValMax Valeur maximale.
 * @param {Bolean} bDistincts (optionnel, par défaut false) True si tirage sans remise, false sinon.
 * @returns {String} Chaîne des choix de nombres concaténés avec le séparateur ;.
 */
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
        if(bDistincts == true && sChoix.indexOf(`;${nbAlea};`) > -1) {
            i--;
        } else {
            sChoix += nbAlea + ";";
        }
    }
    // Valeur retournée par la fonction
    return sChoix;
}


// Exemples de gestion des événements
oCanvas.addEventListener("click", gererClic);

function gererClic(evt) {
    //console.log("On a cliqué !");
    // console.log("Objet événement reçu dans le paramètre evt : ", evt);
    // console.log("Position X du clic dans le canvas : ", evt.offsetX);
    // console.log("Touche ALT : ", evt.altKey);
    
    const x = evt.offsetX;
    const y = evt.offsetY;

    // Distinguer le bouton RESTER
    if(x>50 && x<200 && y>300 && y<350) {
        console.log("Bouton RESTER cliqué");
    }
    
    
}


function ditAllo() {
    alert("Allo !");
}

// ditAllo();

/**
 * Dessine un bouton d'action dans le canvas.
 * @param {Number} nPosX Position horizontal du début du bouton.
 * @param {Number} nPosY Position vertical du début du bouton.
 * @param {Number} nLargeur Largeur du bouton.
 * @param {Number} nHauteur Hauteur du bouton.
 * @param {String} sFond Couleur (nom, hex, etc.) du fond du bouton.
 * @param {String} sTexte Texte sur le bouton.
 * @returns void;
 */
function dessinerBouton(nPosX, nPosY, nLargeur, nHauteur, sFond, sTexte) {
    oCtx.fillStyle = sFond;
    oCtx.fillRect(nPosX, nPosY, nLargeur, nHauteur, 10);
    oCtx.fillStyle = "#ffffff";
    oCtx.font = "20px Arial";
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "center";
    oCtx.fillText(sTexte, nPosX + nLargeur / 2, nPosY + nHauteur / 2);
}

// Bouton Rester (fond rouge foncé)
dessinerBouton(50, 300, 150, 50, "#b22222", "Rester");
// Bouton Tirer (fond vert foncé)
dessinerBouton(300, 300, 150, 50, "#228b22", "Tirer");