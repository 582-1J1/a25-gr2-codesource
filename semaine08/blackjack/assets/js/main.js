/**
 * Jeu du BlackJack (simplifié)
 * @version 0.0.1
 */

/** @type {HTMLCanvasElement} */
const oCanvas = document.querySelector("#scene");
const oCtx = oCanvas.getContext("2d");

/******** Variables globales **********/
// Info générale
const nLargeurCanvas = oCanvas.width;
const nHauteurCanvas = oCanvas.height;
const nCentre = nLargeurCanvas/2;
const nMilieu = nHauteurCanvas/2;

// État/Boucle du jeu
let sEtat = "";
let nIdMinuterie;

// Écran "Intro"
let nPosXTexte = -300;
// Autres variables pour les angles de rotation de chaque cartes dans l'intro;

// Images
// Les cartes
const oImgCarte1 = new Image();
oImgCarte1.src = "assets/images/1.png";
const oImgCarte2 = new Image();
oImgCarte2.src = "assets/images/2.png";
const oImgCarte3 = new Image();
oImgCarte3.src = "assets/images/3.png";
const oImgCarte4 = new Image();
oImgCarte4.src = "assets/images/4.png";
const oImgCarte5 = new Image();
oImgCarte5.src = "assets/images/5.png";
const oImgCarte6 = new Image();
oImgCarte6.src = "assets/images/6.png";
const oImgCarte7 = new Image();
oImgCarte7.src = "assets/images/7.png";
const oImgCarte8 = new Image();
oImgCarte8.src = "assets/images/8.png";
const oImgCarte9 = new Image();
oImgCarte9.src = "assets/images/9.png";
const oImgCarte10 = new Image();
oImgCarte10.src = "assets/images/10.png";
const oImgCarte11 = new Image();
oImgCarte11.src = "assets/images/11.png";
const oImgCarte12 = new Image();
oImgCarte12.src = "assets/images/12.png";
const oImgCarte13 = new Image();
oImgCarte13.src = "assets/images/13.png";
const oImgCarteDos = new Image();
oImgCarteDos.src = "assets/images/dos.png";
// La table du jeu
const oImgTable = new Image();
oImgTable.src = "assets/images/table-bg.jpg";

/************************ Gestion des événements ******************************/
// Chargement de la page.
window.addEventListener("load", demarrer);
// Clics dans le canvas
oCanvas.addEventListener("click", function(evt) {
    
});

// Touches clavier
// Gérer l'événement appuyer sur une touche
// document.addEventListener("keypress", () => sEtat = "partie");
// document.addEventListener("keypress", function() {
//     sEtat = "partie"
// });
document.addEventListener("keypress", function(evt) {
    if(sEtat=="intro" && evt.code == "Space") {
        sEtat = "partie";
    }
});

function demarrer() {
    sEtat = "intro";
    nIdMinuterie = setInterval(boucleJeu, 1000/120);
    console.log("Identifiant de la minuterie : ", nIdMinuterie);
    

    // introJeu();
}

function boucleJeu() {
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    if(sEtat == "intro") {
        introJeu();
    }
    else if(sEtat == "partie") {
        partieJeu();
    }
    else if(sEtat == "fin") {
        finJeu();
    }
}

// Écran 1 : intro animée
function introJeu() {
    console.log("Dans introJeu...");
    
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
        oCtx.font = "24px Arial";
        oCtx.fillText("Appuyer sur une touche pour commencer le jeu.", nCentre, nMilieu + 50);

        // Arrêter la minuterie
        // clearInterval(nIdMinuterie);

        // Faire apparaître les cartes
        oCtx.save();
        oCtx.rotate(25*Math.PI/180);
        oCtx.drawImage(oImgCarte13, 0, 0, 100, 150);
        oCtx.restore();

        oCtx.save();
        oCtx.rotate(-30*Math.PI/180);
        oCtx.drawImage(oImgCarte9, nCentre + 10, nMilieu - 10, 100, 150);
        oCtx.restore();
        
    }
}

// Écran 2 : partie de jeu.
function partieJeu() {
    console.log("Dans partieJeu...");
    // Image de fond (table du BlackJack)
    oCtx.drawImage(oImgTable, 0, 0, nLargeurCanvas, nHauteurCanvas);

}

// Écran 3 (et final) : affichage des résultats.
function finJeu() {
    console.log("Dans finJeu...");
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