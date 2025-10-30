/**
 * Jeu du BlackJack (simplifié)
 * @version 0.0.1
 */

/** @type {HTMLCanvasElement} */
const oCanvas = document.querySelector("#scene");
const oCtx = oCanvas.getContext("2d");

// Variables globales
// Info générale
const nLargeurCanvas = oCanvas.width;
const nHauteurCanvas = oCanvas.height;
const nCentre = nLargeurCanvas/2;
const nMilieu = nHauteurCanvas/2;

window.addEventListener("load", demarrer);

// nIdMinuterie définie comme variable GLOBALE : Visible dans les fonctions (partout)
let nIdMinuterie;
function demarrer() {
    // Amélioration : RequestAnimationFrame
    
    nIdMinuterie = setInterval(introJeu, 1000/60);
    console.log("Identifiant de la minuterie : ", nIdMinuterie);
    

    // introJeu();
}

let nPosXTexte = -300;
function introJeu() {
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    console.log("Appel de la fonction intro... ");
    
    oCtx.fillStyle = "black";
    oCtx.font = "60px Arial";
    oCtx.textAlign = "center";
    oCtx.textBaseline = "middle";
    oCtx.fillText("B L A C K J A C K", nPosXTexte, nMilieu);
    // Condition pour arrêter de modifier la position en X
    // Ajouter le pas jusqu'à atteindre la position souhaitée
    if(nPosXTexte < nCentre) {
        nPosXTexte += 5;
    }
    else {
        // Arrêter la minuterie
        clearInterval(nIdMinuterie);
    }
}


/**
 * Simule le tirage d'une carte d'un jeu de carte (représentré par des nombres 
 * de 1 à 13 (As = 1, 2...10, Valet = 11, Reine = 12, Roi = 13)).
 * @returns {Number} Nombre aléatoire généré.
 */
function tirerCarte() {
    return Math.floor(Math.random()*13) + 1;
}

/**
 * Calcule la valeur d'une carte (Maximum 10).
 * @param {Number} nCarte Carte dont on veut la valeur (1 à 13).
 * @returns {Number} Valeur de la carte (1 à 10).
 */
function calculerValeurCarte(nCarte) {
    return Math.min(nCarte, 10);
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
function dessinerBouton(nPosX, nPosY, nLargeur=100, nHauteur=50, sFond = 'darkgrey', sTexte = 'Bouton') {
    oCtx.fillStyle = sFond;
    oCtx.fillRect(nPosX, nPosY, nLargeur, nHauteur, 10);
    oCtx.fillStyle = "#ffffff";
    oCtx.font = "20px Arial";
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "center";
    oCtx.fillText(sTexte, nPosX + nLargeur / 2, nPosY + nHauteur / 2);
}

/*

// Bouton Rester (fond rouge foncé)
dessinerBouton(50, 300, 150, 50, "#b22222", "Rester");
// Bouton Tirer (fond vert foncé)
dessinerBouton(300, 300, 150, 50, "#228b22", "Tirer");

// Bouton générique (test)
dessinerBouton(10, 10);

*/